import { useEffect, useState } from "react";

import "../../styles/habit/HabitModal.css";
import { HabitCreateRequest } from "../../types/dto/request/HabitCreateRequest";

interface HabitModalProps {
    open: boolean;
    creating: boolean;

    error: string;

    fieldErrors: Record<string, string>;

    onClose: () => void;

    onCreate: (
        request: HabitCreateRequest
    ) => Promise<void>;
}

export default function HabitModal({
    open,
    creating,
    error,
    fieldErrors,
    onClose,
    onCreate,
}: HabitModalProps) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (open) {
            setName("");
            setDescription("");
        }
    }, [open]);

    if (!open) {
        return null;
    }

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        await onCreate({
            name,
            description
        }
        );
    }

    return (
        <div
            className="habit-modal-overlay"
            onClick={onClose}
        >
            <div
                className="habit-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Create Habit</h2>

                <form onSubmit={handleSubmit}>

                    <div className="habit-form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Read books"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className={
                                fieldErrors.name
                                    ? "input-error"
                                    : ""
                            }
                        />

                        {fieldErrors.name && (
                            <p className="field-error">
                                {fieldErrors.name}
                            </p>
                        )}
                    </div>

                    <div className="habit-form-group">
                        <label>Description</label>

                        <textarea
                            placeholder="Optional"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            className={
                                fieldErrors.description
                                    ? "input-error"
                                    : ""
                            }
                        />

                        {fieldErrors.description && (
                            <p className="field-error">
                                {fieldErrors.description}
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="habit-error">
                            {error}
                        </p>
                    )}

                    <div className="habit-modal-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-button"
                            disabled={creating}
                        >
                            {creating
                                ? "Creating..."
                                : "Create"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}