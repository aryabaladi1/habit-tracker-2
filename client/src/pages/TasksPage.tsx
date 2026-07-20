import { useEffect, useState } from "react";

import { createTask, getAllTasks } from "../api/taskService";
import type { TaskResponse } from "../types/dto/response/TaskResponse";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/dto/ApiErrorResponse";
import { TaskDifficulty } from "../types/enums/TaskDifficulty";
import "../styles/tasks/TasksPage.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [difficulty, setDifficulty] = useState<TaskDifficulty>(
    TaskDifficulty.MEDIUM
  );

  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function fetchTasks() {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setFieldErrors({});

    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Task name cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const created = await createTask({
        name,
        description,
        difficulty,
        dueDate: dueDate ? `${dueDate}T00:00:00` : null,
      });

      setTasks((prev) => [created, ...prev]);

      setName("");
      setDescription("");
      setDueDate("");
      setDifficulty(TaskDifficulty.MEDIUM);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      const data = error.response?.data;

      if (!data) {
        setError("Failed to create task");
        return;
      }

      if (data.errors && Object.keys(data.errors).length > 0) {
        setFieldErrors(data.errors);
        setError("");
      } else {
        setError(data.message);
      }
    }
  }

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Tasks</h1>

      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            setFieldErrors((prev) => ({
              ...prev,
              name: "",
            }));
          }}
          className={fieldErrors.name ? "input-error" : ""}
        />

        {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);

            setFieldErrors((prev) => ({
              ...prev,
              description: "",
            }));
          }}
          className={fieldErrors.description ? "input-error" : ""}
        />

        {fieldErrors.description && (
          <p className="field-error">{fieldErrors.description}</p>
        )}

        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value as TaskDifficulty);

            setFieldErrors((prev) => ({
              ...prev,
              difficulty: "",
            }));
          }}
          className={fieldErrors.difficulty ? "input-error" : ""}
        >
          <option value={TaskDifficulty.EASY}>Easy</option>

          <option value={TaskDifficulty.MEDIUM}>Medium</option>

          <option value={TaskDifficulty.HARD}>Hard</option>
        </select>

        {fieldErrors.difficulty && (
          <p className="field-error">{fieldErrors.difficulty}</p>
        )}

        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);

            setFieldErrors((prev) => ({
              ...prev,
              dueDate: "",
            }));
          }}
          className={fieldErrors.dueDate ? "input-error" : ""}
        />

        {fieldErrors.dueDate && (
          <p className="field-error">{fieldErrors.dueDate}</p>
        )}

        {error && <p className="task-error">{error}</p>}

        <button type="submit">Create Task</button>
      </form>

      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.name}</h3>

            <p>{task.description}</p>

            <p>Difficulty: {task.difficulty}</p>

            <p>Status: {task.status}</p>

            <p>Due: {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
