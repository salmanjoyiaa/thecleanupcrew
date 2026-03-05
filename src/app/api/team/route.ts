import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
    const guard = await requireDashboardRole(["admin", "dispatcher", "manager"]);
    if (!guard.ok) return guard.response;

    const { data, error } = await guard.adminClient
        .from("team_members")
        .select(
            "id, name, email, phone, role, region, pay_type, is_active, auth_user_id, credentials_sent, invited_at, last_invite_method, password_reset_required, created_at"
        )
        .order("name");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const guard = await requireDashboardRole(["admin"]);
    if (!guard.ok) return guard.response;

    const body = await request.json();
    const { name, email, phone, role, region, pay_type } = body ?? {};

    const safeName = String(name ?? "").trim();
    const safeEmail = String(email ?? "").trim().toLowerCase();
    const safeRole = String(role ?? "").trim();
    const safePhone = phone ? String(phone).trim() : null;
    const safeRegion = region ? String(region).trim() : null;
    const safePayType = pay_type ? String(pay_type).trim() : null;

    if (!safeName || !safeEmail || !safeRole) {
        return NextResponse.json(
            { error: "Name, email, and role are required" },
            { status: 400 }
        );
    }

    if (!EMAIL_REGEX.test(safeEmail)) {
        return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const { data: existing } = await guard.adminClient
        .from("team_members")
        .select("id")
        .eq("email", safeEmail)
        .maybeSingle();

    if (existing) {
        return NextResponse.json(
            { error: "A team member with this email already exists." },
            { status: 409 }
        );
    }

    const { data, error } = await guard.adminClient
        .from("team_members")
        .insert({
            name: safeName,
            email: safeEmail,
            phone: safePhone,
            role: safeRole,
            region: safeRegion,
            pay_type: safePayType,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
