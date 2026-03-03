import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { propertyType, windowCount, floors, addOns } = await req.json()

        let baseRate = 0;
        if (propertyType === 'residential') {
            baseRate = 6.50; // $6.50 per pane CAD
        } else if (propertyType === 'commercial') {
            baseRate = 4.00; // $4.00 per pane CAD
        }

        let floorMultiplier = 1.0;
        if (floors > 2) floorMultiplier = 1.2; // 20% premium for hard-to-reach
        if (floors > 5) floorMultiplier = 1.5;

        let subtotal = (windowCount * baseRate) * floorMultiplier;

        // Add-ons
        let addOnTotal = 0;
        if (addOns?.includes('screens')) addOnTotal += windowCount * 2.00;
        if (addOns?.includes('tracks')) addOnTotal += 45.00; // Flat fee

        const totalCAD = subtotal + addOnTotal;

        return new Response(
            JSON.stringify({ estimate: Number(totalCAD.toFixed(2)), currency: 'CAD' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
