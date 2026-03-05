import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin", "dispatcher", "manager"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const { data, error } = await guard.adminClient
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(data);
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const body = await request.json();
    const allowedFields = ["role", "pay_type", "region", "phone", "is_active", "name"] as const;
    const updatePayload: Record<string, unknown> = {};

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(body ?? {}, field)) {
            const raw = body[field];
            updatePayload[field] = typeof raw === "string" ? raw.trim() : raw;
        }
    }

    if (Object.keys(updatePayload).length === 0) {
        return NextResponse.json({ error: "No valid fields were provided." }, { status: 400 });
    }

    const { data, error } = await guard.adminClient
        .from("team_members")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const { error } = await guard.adminClient
        .from("team_members")
        .update({ is_active: false })
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
}
