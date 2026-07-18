import { useEffect, useState } from "react";

import { createHabit, getAllHabits, } from "../api/habitService";

import type { HabitResponse } from "../types/dto/response/HabitResponse";

import { AxiosError } from "axios";

import HabitCard from "../components/habit/HabitCard";

import type { ApiErrorResponse } from "../types/dto/ApiErrorResponse";

import "../styles/habit/HabitsPage.css";
import { HabitCreateRequest } from "../types/dto/request/HabitCreateRequest";
import HabitModal from "../components/habit/HabitModal";

export default function HabitsPage() {

  const [habits, setHabits] = useState<HabitResponse[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

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

  async function handleCreateHabit(request: HabitCreateRequest) {
    setError("");
    setFieldErrors({});

    try {
      setCreating(true);

      const newHabit = await createHabit(request);

      setHabits((prev) => [
        newHabit,
        ...prev,
      ]);

      setShowCreateModal(false);
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

          <div>
              <h1>Your Habits</h1>

              <p>
                  Build consistency through weekly progress.
              </p>
          </div>

          <button
              className="add-habit-button"
              onClick={() => {
                  setFieldErrors({});
                  setError("");
                  setShowCreateModal(true);
              }}
          >
              +
          </button>

      </div>

      <HabitModal
          open={showCreateModal}
          creating={creating}
          error={error}
          fieldErrors={fieldErrors}
          onClose={() => {
              setShowCreateModal(false);
              setError("");
              setFieldErrors({});
          }}
          onCreate={handleCreateHabit}
      />

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
                  <HabitCard
                      key={habit.id}
                      habit={habit}
                  />
              ))}
          </div>
        )}

      </div>
    </div>
  );
}