import { useEffect, useState } from "react";

import {
  createTask,
  getAllTasks,
} from "../api/taskService";

import type { TaskResponse } from "../types/dto/task/response/TaskResponse";

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

  async function handleCreateTask(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    try {
    const created = await createTask({
        name,
        description,
        difficulty,
        dueDate: `${dueDate}T00:00:00`,
    });

      setTasks((prev) => [created, ...prev]);

      setName("");
      setDescription("");
      setDueDate("");

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to create task"
      );
    }
  }

  return (
    <div className="tasks-container">

      <h1 className="tasks-title">
        Tasks
      </h1>

      <form
        onSubmit={handleCreateTask}
        className="task-form"
      >

        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
            value={difficulty}
            onChange={(e) =>
                setDifficulty(e.target.value as TaskDifficulty)
            }
            >
            <option value={TaskDifficulty.EASY}>Easy</option>
            <option value={TaskDifficulty.MEDIUM}>Medium</option>
            <option value={TaskDifficulty.HARD}>Hard</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        {error && (
          <p className="task-error">
            {error}
          </p>
        )}

        <button type="submit">
          Create Task
        </button>

      </form>

      <div className="tasks-list">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
          >

            <h3>{task.name}</h3>

            <p>
              {task.description}
            </p>

            <p>
              Difficulty: {task.difficulty}
            </p>

            <p>
              Status: {task.status}
            </p>

            <p>
              Due: {task.dueDate}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}