import "../../styles/weeks/WeekHeader.css";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { getISOYear } from "../../utils/date";
import WeekSelector from "./WeekSelector";
import { formatMonthDay } from "../../utils/date";

interface WeekHeaderProps {
  weekNumber: number;
  startDate: Date;
  endDate: Date;

  currentYear: number;
  displayedYear: number;
  currentWeek: number;
  displayedWeek: number;

  showWeekSelector: boolean;

  onOpenWeekSelector: () => void;
  onCloseWeekSelector: () => void;

  onWeekSelected: (year: number, week: number) => void;

  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export default function WeekHeader({
  weekNumber,
  startDate,
  endDate,

  currentYear,
  displayedYear,
  currentWeek,
  displayedWeek,

  showWeekSelector,
  onOpenWeekSelector,
  onCloseWeekSelector,
  onWeekSelected,
  onPreviousWeek,
  onNextWeek,
}: WeekHeaderProps) {
  return (
    <div className="week-header">
      <button className="week-title-button" onClick={onOpenWeekSelector}>
        Week {weekNumber}
      </button>

      <WeekSelector
        open={showWeekSelector}
        currentYear={currentYear}
        currentWeek={currentWeek}
        displayedYear={displayedYear}
        displayedWeek={displayedWeek}
        onClose={onCloseWeekSelector}
        onSelect={onWeekSelected}
      />

      <div className="week-navigation">
        <button className="week-nav-button" onClick={onPreviousWeek}>
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="week-date-info">
          <div className="week-range">
            {formatMonthDay(startDate)}
            {" - "}
            {formatMonthDay(endDate)}
          </div>

          <div className="week-year">{getISOYear(startDate)}</div>
        </div>

        <button className="week-nav-button" onClick={onNextWeek}>
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
