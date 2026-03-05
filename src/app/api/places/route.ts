import { NextResponse } from "next/server";
import { requireDashboardRole } from "@/lib/supabase/route-guards";

function normalize(value: string | null | undefined) {
    return (value ?? "").trim();
}

export async function GET() {
    const guard = await requireDashboardRole(["admin", "dispatcher", "manager"]);
    if (!guard.ok) return guard.response;

    const { data, error } = await guard.adminClient
        .from("places")
        .select(
            "id, address, city, province, postal_code, access_instructions, hazards, gate_code, recurring_schedule, created_at"
        )
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
    const guard = await requireDashboardRole(["admin", "dispatcher"]);
    if (!guard.ok) return guard.response;

    const body = await request.json();
    const address = normalize(body?.address);
    const city = normalize(body?.city) || null;
    const province = normalize(body?.province) || null;
    const postalCode = normalize(body?.postal_code) || null;
    const accessInstructions = normalize(body?.access_instructions) || null;
    const hazards = normalize(body?.hazards) || null;
    const gateCode = normalize(body?.gate_code) || null;
    const recurringSchedule = normalize(body?.recurring_schedule) || null;

    if (!address) {
        return NextResponse.json({ error: "Address is required." }, { status: 400 });
    }

    const { data: possibleDuplicates } = await guard.adminClient
        .from("places")
        .select("id, address, city, province, postal_code")
        .ilike("address", address);

    const duplicate = (possibleDuplicates ?? []).find((item) => {
        const normalizedCity = normalize(item.city);
        const normalizedProvince = normalize(item.province);
        const normalizedPostalCode = normalize(item.postal_code);

        return (
            normalizedCity.toLowerCase() === (city ?? "").toLowerCase() &&
            normalizedProvince.toLowerCase() === (province ?? "").toLowerCase() &&
            normalizedPostalCode.toLowerCase() === (postalCode ?? "").toLowerCase()
        );
    });

    if (duplicate) {
        return NextResponse.json(
            { error: "A place with the same address already exists." },
            { status: 409 }
        );
    }

    const { data, error } = await guard.adminClient
        .from("places")
        .insert({
            address,
            city,
            province,
            postal_code: postalCode,
            access_instructions: accessInstructions,
            hazards,
            gate_code: gateCode,
            recurring_schedule: recurringSchedule,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}
