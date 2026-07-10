import "../../styles/weeks/WeekHeader.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface WeekHeaderProps {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export default function WeekHeader({
  weekNumber,
  startDate,
  endDate,
  onPreviousWeek,
  onNextWeek,
}: WeekHeaderProps) {

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="week-header">

      <Link to="/weeks" className="week-title-link">
        <h1 className="week-title">
          Week {weekNumber}
        </h1>
      </Link>

      <div className="week-navigation">

      <button className="week-nav-button" onClick={onPreviousWeek}>
            <ChevronLeft size={20} />
            Previous
      </button>

        <div className="week-range">
          {formatDate(startDate)}
          {" - "}
          {formatDate(endDate)}
        </div>

        <button className="week-nav-button" onClick={onNextWeek}>
            Next
            <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
}