"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreatePlaceDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        address: "",
        city: "",
        province: "",
        postal_code: "",
        access_instructions: "",
        gate_code: "",
        recurring_schedule: "",
    });

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const res = await fetch("/api/places", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            toast.success("Place created");
            setOpen(false);
            setForm({
                address: "",
                city: "",
                province: "",
                postal_code: "",
                access_instructions: "",
                gate_code: "",
                recurring_schedule: "",
            });
            router.refresh();
        } else {
            const { error } = await res.json();
            toast.error(error ?? "Failed to create place");
        }

        setSaving(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                    <Plus size={16} />
                    Add Place
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Place</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="pl-address">Address *</Label>
                        <Input
                            id="pl-address"
                            required
                            value={form.address}
                            onChange={(e) => update("address", e.target.value)}
                            placeholder="123 Main St"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="pl-city">City</Label>
                            <Input
                                id="pl-city"
                                value={form.city}
                                onChange={(e) => update("city", e.target.value)}
                                placeholder="Toronto"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="pl-province">Province</Label>
                            <Input
                                id="pl-province"
                                value={form.province}
                                onChange={(e) => update("province", e.target.value)}
                                placeholder="ON"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="pl-postal">Postal Code</Label>
                            <Input
                                id="pl-postal"
                                value={form.postal_code}
                                onChange={(e) => update("postal_code", e.target.value)}
                                placeholder="M5V 2T6"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="pl-access">Access Instructions</Label>
                            <Input
                                id="pl-access"
                                value={form.access_instructions}
                                onChange={(e) => update("access_instructions", e.target.value)}
                                placeholder="Use side entrance"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="pl-gate">Gate Code</Label>
                            <Input
                                id="pl-gate"
                                value={form.gate_code}
                                onChange={(e) => update("gate_code", e.target.value)}
                                placeholder="A1122"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="pl-schedule">Recurring Schedule</Label>
                        <Input
                            id="pl-schedule"
                            value={form.recurring_schedule}
                            onChange={(e) => update("recurring_schedule", e.target.value)}
                            placeholder="Weekly Tuesday"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Create Place"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
