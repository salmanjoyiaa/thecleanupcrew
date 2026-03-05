import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_STATUSES = ["new", "contacted", "quoted", "booked", "lost", "cancelled"];

export async function GET(request: Request) {
    const guard = await requireDashboardRole(["admin", "dispatcher", "manager"]);
    if (!guard.ok) return guard.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = guard.adminClient
        .from("leads")
        .select(
            "id, name, email, phone, status, source, notes, created_at, updated_at, assigned_to, team_members(name)"
        )
        .order("created_at", { ascending: false });

    if (status && status !== "all") {
        query = query.eq("status", status);
    }
    if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
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
    const { name, email, phone, source, status, notes, assigned_to } = body ?? {};

    const safeName = String(name ?? "").trim();
    const safeEmail = email ? String(email).trim().toLowerCase() : null;
    const safeStatus = status ? String(status).trim() : "new";

    if (!safeName) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (safeEmail && !EMAIL_REGEX.test(safeEmail)) {
        return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.includes(safeStatus)) {
        return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
    }

    if (assigned_to) {
        const { data: member } = await guard.adminClient
            .from("team_members")
            .select("id")
            .eq("id", assigned_to)
            .eq("is_active", true)
            .maybeSingle();

        if (!member) {
            return NextResponse.json({ error: "Assigned team member was not found." }, { status: 400 });
        }
    }

    const { data, error } = await guard.adminClient
        .from("leads")
        .insert({
            name: safeName,
            email: safeEmail,
            phone: phone ? String(phone).trim() : null,
            source: source ? String(source).trim() : "manual",
            status: safeStatus,
            notes: notes ? String(notes).trim() : null,
            assigned_to: assigned_to ?? null,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
