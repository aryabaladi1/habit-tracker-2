import type { HabitResponse } from "../../types/dto/response/HabitResponse";

import "../../styles/habit/HabitCard.css";
import { minutesToTime } from "../../utils/time";

interface HabitCardProps {
    habit: HabitResponse;

    onEdit?: (habit: HabitResponse) => void;
    onArchive?: (habit: HabitResponse) => void;
}

export default function HabitCard({
    habit,
}: HabitCardProps) {
    return (
        <div className="habit-card">

            <div className="habit-card-top">

                <h2>{habit.name}</h2>

                <span>
                    {minutesToTime(habit.minutesTotal)} min
                </span>

            </div>

            <p>
                {habit.description || "No description."}
            </p>

            <div className="habit-meta">
                Created{" "}
                {new Date(habit.createdAt).toLocaleDateString()}
            </div>

        </div>
    );
}