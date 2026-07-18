import type { HabitResponse } from "../../types/dto/response/HabitResponse";
import { Pencil, Archive } from "lucide-react";

import "../../styles/habit/HabitCard.css";
import { minutesToTime } from "../../utils/time";

interface HabitCardProps {
    habit: HabitResponse;

    onEdit?: (habit: HabitResponse) => void;
    onArchive?: (habit: HabitResponse) => void;
}

export default function HabitCard({
    habit,
    onEdit,
    onArchive
}: HabitCardProps) {
    return (
        <div className="habit-card">

            <div className="habit-card-top">

            <h2>{habit.name}</h2>

            <div className="habit-actions">

                <button
                    className="icon-button"
                    onClick={() => onEdit?.(habit)}
                >
                    <Pencil size={18}/>
                </button>

                <button
                    className="icon-button danger"
                    onClick={() => onArchive?.(habit)}
                >
                    <Archive size={18}/>
                </button>

            </div>

            </div>

            <div className="habit-time">
            {minutesToTime(habit.minutesTotal)}
            </div>

        </div>
    );
}