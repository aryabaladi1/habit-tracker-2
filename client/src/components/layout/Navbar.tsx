import { Link, NavLink } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

import "../../styles/layout/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-logo">
        <Link to="/">Eiki</Link>
      </div>

      <nav className="navbar-links">

        <NavLink to="/week">
          Week
        </NavLink>

        <NavLink to="/calendar">
          Calendar
        </NavLink>

        <NavLink to="/habits">
          Habits
        </NavLink>

        <NavLink to="/statistics">
          Statistics
        </NavLink>

      </nav>

      <div className="navbar-user">
        <UserCircle2 size={30} />
      </div>

    </header>
  );
}