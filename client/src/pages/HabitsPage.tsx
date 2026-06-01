import { useEffect, useState } from "react";

import { createHabit, getAllHabits, } from "../api/habitService";

import type { HabitResponse } from "../types/dto/habit/response/HabitResponse";

import "../styles/habit/HabitsPage.css";

export default function HabitsPage() {

  const [habits, setHabits] = useState<HabitResponse[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      const data = await getAllHabits();
      setHabits(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load habits.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateHabit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Habit name is required.");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const newHabit = await createHabit({
        name,
        description,
      });

      setHabits((prev) => [
        newHabit,
        ...prev,
      ]);

      setName("");
      setDescription("");

    } catch (err: any) {
      setError(
        err.response?.data?.message
        || "Failed to create habit."
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="habits-container">

      <div className="habits-content">

        <div className="habits-header">
          <h1>Your Habits</h1>

          <p>
            Build consistency through weekly progress.
          </p>
        </div>

        <form
          onSubmit={handleCreateHabit}
          className="habit-form"
        >

          <input
            type="text"
            placeholder="Habit name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          {error && (
            <p className="habit-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={creating}
          >
            {creating
              ? "Creating..."
              : "Create Habit"}
          </button>

        </form>

        {loading ? (
          <p className="habits-loading">
            Loading habits...
          </p>
        ) : habits.length === 0 ? (
          <p className="habits-empty">
            No habits yet.
          </p>
        ) : (
          <div className="habits-grid">

            {habits.map((habit) => (
              <div
                key={habit.id}
                className="habit-card"
              >

                <div className="habit-card-top">
                  <h2>{habit.name}</h2>

                  <span>
                    {habit.minutesTotal} min
                  </span>
                </div>

                <p>
                  {habit.description
                    || "No description."}
                </p>

                <div className="habit-meta">
                  Created:
                  {" "}
                  {new Date(
                    habit.createdAt
                  ).toLocaleDateString()}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}