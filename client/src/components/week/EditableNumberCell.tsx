import { useEffect, useRef, useState } from "react";

import "../../styles/weeks/EditableNumberCell.css";

interface EditableNumberCellProps {
    value?: number | null;
    mode?: "number" | "time";
    onSave: (value: number) => void;
}

export default function EditableNumberCell({
    value,
    mode = "number",
    onSave,
}: EditableNumberCellProps) {

    const [editing, setEditing] = useState(false);

    const [draft, setDraft] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    function minutesToTime(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hours.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}`;
    }

    function timeToMinutes(time: string): number {
        const [hours, minutes] = time.split(":").map(Number);

        return hours * 60 + minutes;
    }

    function formatDigits(value: string): string {

        const digits = value.replace(/\D/g, "").slice(0, 4);

        const padded = digits.padStart(4, "0");

        return `${padded.slice(0, 2)}:${padded.slice(2)}`;
    }

    useEffect(() => {
        setDraft(
            mode === "time"
                ? minutesToTime(value ?? 0)
                : (value?.toString() ?? "")
        );
    }, [value, mode]);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    function save() {

        if (mode === "time") {

            const minutes = timeToMinutes(draft);

            onSave(minutes);

        } else {

            onSave(Number(draft) || 0);

        }

        setEditing(false);
    }

    if (editing) {

        return (

            <input
                ref={inputRef}
                className="editable-number-input"
                type="text"
                value={draft}
                maxLength={5}
                onChange={(e) => {

                    if (mode === "time") {
                        setDraft(formatDigits(e.target.value));
                    } else {
                        setDraft(e.target.value);
                    }

                }}
                onBlur={save}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {
                        save();
                    }

                    if (e.key === "Escape") {

                        setDraft(
                            mode === "time"
                                ? minutesToTime(value ?? 0)
                                : (value?.toString() ?? "")
                        );

                        setEditing(false);

                    }

                }}
            />

        );
    }

    return (

        <div
            className="editable-number-display"
            onClick={() => setEditing(true)}
        >
            {
                mode === "time"
                    ? minutesToTime(value ?? 0)
                    : (value ?? 0)
            }
        </div>

    );

}