import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

const ALLOWED_PRIORITIES = ["low", "normal", "high", "urgent"];

export async function GET(request: Request) {
    const guard = await requireDashboardRole(["admin", "dispatcher", "manager"]);
    if (!guard.ok) return guard.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = guard.adminClient
        .from("assignments")
        .select(
            "id, status, scheduled_date, scheduled_window_start, scheduled_window_end, priority, estimated_duration_minutes, notes, created_at, completed_at, assigned_to, lead_id, place_id, team_members(name), places(address, city)"
        )
        .order("scheduled_date", { ascending: true, nullsFirst: false });

    if (status && status !== "all") {
        query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const guard = await requireDashboardRole(["admin", "dispatcher"]);
    if (!guard.ok) return guard.response;

    const body = await request.json();
    const {
        lead_id,
        place_id,
        assigned_to,
        scheduled_date,
        scheduled_window_start,
        scheduled_window_end,
        priority,
        estimated_duration_minutes,
        notes,
    } = body;

    if (!lead_id && !place_id) {
        return NextResponse.json({ error: "Provide at least a lead or a place for this assignment." }, { status: 400 });
    }

    if (priority && !ALLOWED_PRIORITIES.includes(String(priority))) {
        return NextResponse.json({ error: "Invalid priority value." }, { status: 400 });
    }

    if (lead_id) {
        const { data: lead } = await guard.adminClient
            .from("leads")
            .select("id")
            .eq("id", lead_id)
            .maybeSingle();

        if (!lead) {
            return NextResponse.json({ error: "Selected lead does not exist." }, { status: 400 });
        }
    }

    if (place_id) {
        const { data: place } = await guard.adminClient
            .from("places")
            .select("id")
            .eq("id", place_id)
            .maybeSingle();

        if (!place) {
            return NextResponse.json({ error: "Selected place does not exist." }, { status: 400 });
        }
    }

    if (assigned_to) {
        const { data: assignee } = await guard.adminClient
            .from("team_members")
            .select("id")
            .eq("id", assigned_to)
            .eq("is_active", true)
            .maybeSingle();

        if (!assignee) {
            return NextResponse.json({ error: "Assigned team member was not found." }, { status: 400 });
        }
    }

    const { data, error } = await guard.adminClient
        .from("assignments")
        .insert({
            lead_id,
            place_id,
            assigned_to,
            status: assigned_to ? "assigned" : "created",
            scheduled_date,
            scheduled_window_start,
            scheduled_window_end,
            priority: priority ?? "normal",
            estimated_duration_minutes,
            notes,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log initial status
    if (data) {
        await guard.adminClient.from("assignment_status_log").insert({
            assignment_id: data.id,
            old_status: null,
            new_status: data.status,
            notes: "Assignment created",
        });
    }

    return NextResponse.json(data, { status: 201 });
}
