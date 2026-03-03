import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // TODO: When Supabase is configured, uncomment this:
        // import { createClient } from '@supabase/supabase-js';
        // const supabase = createClient(
        //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
        //   process.env.SUPABASE_SERVICE_ROLE_KEY!
        // );
        // const { error } = await supabase.from('contact_submissions').insert({
        //   name, email, phone, subject, message,
        // });
        // if (error) throw error;

        // For now, just log and return success
        console.log("Contact form submission:", {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            { success: true, message: "Form submitted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
