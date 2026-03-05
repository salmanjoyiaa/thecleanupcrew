import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

function normalize(value: string | null | undefined) {
    return (value ?? "").trim();
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await requireDashboardRole(["admin", "dispatcher"]);
    if (!guard.ok) return guard.response;

    const { id } = await params;
    const body = await request.json();

    const payload: Record<string, string | null> = {
        address: normalize(body?.address) || null,
        city: normalize(body?.city) || null,
        province: normalize(body?.province) || null,
        postal_code: normalize(body?.postal_code) || null,
        access_instructions: normalize(body?.access_instructions) || null,
        hazards: normalize(body?.hazards) || null,
        gate_code: normalize(body?.gate_code) || null,
        recurring_schedule: normalize(body?.recurring_schedule) || null,
    };

    if (!payload.address) {
        return NextResponse.json({ error: "Address is required." }, { status: 400 });
    }

    const { data, error } = await guard.adminClient
        .from("places")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
