import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUserDetails } from "../api/userService";
import "../styles/dashboard/DashboardPage.css";

export default function DashboardPage() {
const { logout } = useAuth();
const navigate = useNavigate();
const [firstName, setFirstName] = useState("");

useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserDetails();
        setFirstName(user.firstName ?? "friend");
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchUser();
  }, []);

const handleLogout = () => {
logout();
navigate("/login");
};

return (
<div className="dashboard-container">
    <nav className="dashboard-navbar">
    <h1 className="dashboard-logo">Habit Tracker</h1>

    <div className="dashboard-links">
    <Link to="/profile" className="profile-circle">
        {firstName.charAt(0).toUpperCase()}
    </Link>
        <Link to="/weeks">Week</Link>
        <Link to="/habits">Habits</Link>
        <Link to="/tasks">Tasks</Link>

        <button onClick={handleLogout} className="logout-button">
        Logout
        </button>
    </div>
    </nav>

    <main className="dashboard-content">
    <h2>Welcome back, {firstName}</h2>

    <p>
        Focus on consistent weekly progress. Track your habits, manage your
        tasks, and keep moving forward.
    </p>

    <div className="dashboard-cards">
        <Link to="/weeks" className="dashboard-card">
        Open Weekly Tracker
        </Link>

        <Link to="/habits" className="dashboard-card">
        Manage Habits
        </Link>

        <Link to="/tasks" className="dashboard-card">
        View Tasks
        </Link>
    </div>
    </main>
</div>
);
}