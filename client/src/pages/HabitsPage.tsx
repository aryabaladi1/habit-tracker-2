import { useEffect, useState } from "react";

import { createHabit, getAllHabits, } from "../api/habitService";

import type { HabitResponse } from "../types/dto/response/HabitResponse";

import { AxiosError } from "axios";

import type { ApiErrorResponse } from "../types/dto/ApiErrorResponse";

import "../styles/habit/HabitsPage.css";

export default function HabitsPage() {

  const [habits, setHabits] = useState<HabitResponse[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string>
  >({});

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
  
    setError("");
    setFieldErrors({});
  
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Habit name cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
  
      setCreating(true);
  
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
  
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      const data = error.response?.data;

      if (!data) {
        setError("Failed to create habit.");
        return;
      }

      if (data.errors && Object.keys(data.errors).length > 0) {
        setFieldErrors(data.errors);
        setError("");
      } else {
        setError(data.message);
      }
  
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
          onChange={(e) => {
            setName(e.target.value);

            setFieldErrors((prev) => ({
              ...prev,
              name: "",
            }));
          }}
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

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);

            setFieldErrors((prev) => ({
              ...prev,
              description: "",
            }));
          }}
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