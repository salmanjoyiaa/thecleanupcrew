import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

const STATUS_ORDER = [
    "created",
    "assigned",
    "accepted",
    "en_route",
    "arrived",
    "in_progress",
    "completed",
    "qa",
    "invoiced",
];

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin", "dispatcher", "manager", "field_agent"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;

    const [assignmentRes, logRes] = await Promise.all([
        guard.adminClient
            .from("assignments")
            .select(
                "*, team_members(id, name, role), places(id, address, city, province, access_instructions), leads(id, name, email, phone)"
            )
            .eq("id", id)
            .single(),
        guard.adminClient
            .from("assignment_status_log")
            .select("*, team_members(name)")
            .eq("assignment_id", id)
            .order("changed_at", { ascending: true }),
    ]);

    if (assignmentRes.error) {
        return NextResponse.json({ error: assignmentRes.error.message }, { status: 404 });
    }

    return NextResponse.json({
        assignment: assignmentRes.data,
        statusLog: logRes.data ?? [],
    });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin", "dispatcher", "field_agent"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const body = await request.json();
    const { new_status, changed_by, log_notes, ...rest } = body;

    // Fetch current status for audit log
    if (new_status) {
        const { data: current } = await guard.adminClient
            .from("assignments")
            .select("status")
            .eq("id", id)
            .single();

        const oldIndex = STATUS_ORDER.indexOf(String(current?.status ?? ""));
        const newIndex = STATUS_ORDER.indexOf(String(new_status));

        if (newIndex === -1) {
            return NextResponse.json({ error: "Invalid assignment status." }, { status: 400 });
        }

        if (oldIndex !== -1 && newIndex < oldIndex) {
            return NextResponse.json(
                { error: "Status cannot move backwards in the workflow." },
                { status: 400 }
            );
        }

        const updatePayload: Record<string, unknown> = {
            ...rest,
            status: new_status,
        };
        if (new_status === "completed") {
            updatePayload.completed_at = new Date().toISOString();
        }

        const { data, error } = await guard.adminClient
            .from("assignments")
            .update(updatePayload)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Write to immutable status log
        await guard.adminClient.from("assignment_status_log").insert({
            assignment_id: id,
            old_status: current?.status ?? null,
            new_status,
            changed_by: changed_by ?? null,
            notes: log_notes ?? null,
        });

        return NextResponse.json(data);
    }

    // General field update (no status change)
    const { data, error } = await guard.adminClient
        .from("assignments")
        .update(rest)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}
