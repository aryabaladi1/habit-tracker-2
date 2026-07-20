import "../../styles/weeks/WeekSelector.css";
import { useEffect, useState } from "react";
import { getISOWeeksInYear } from "../../utils/date";

interface WeekSelectorProps {
  currentYear: number;
  displayedYear: number;
  currentWeek: number;
  displayedWeek: number;
  open: boolean;

  onClose: () => void;

  onSelect: (year: number, week: number) => void;
}

export default function WeekSelector({
  currentYear,
  displayedYear,
  currentWeek,
  displayedWeek,
  open,
  onClose,
  onSelect,
}: WeekSelectorProps) {
  const [selectedYear, setSelectedYear] = useState(displayedYear);

  useEffect(() => {
    if (open) {
      setSelectedYear(displayedYear);
    }
  }, [open, displayedYear]);

  const years = [];

  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    years.push(year);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="week-selector-overlay">
      <div className="week-selector">
        <h3>Select Week</h3>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <div className="week-grid">
          {Array.from({
            length: getISOWeeksInYear(selectedYear),
          }).map((_, index) => {
            const week = index + 1;

            console.log({
              week,
              displayedWeek,
              selectedYear,
              displayedYear,
              isSelected:
                week === displayedWeek && selectedYear === displayedYear,
            });

            return (
              <button
                key={week}
                className={`
                        ${
                          week === currentWeek && selectedYear === currentYear
                            ? "current-week"
                            : ""
                        }

                        ${
                          week === displayedWeek &&
                          selectedYear === displayedYear
                            ? "selected-week"
                            : ""
                        }
                    `}
                onClick={() => {
                  onSelect(selectedYear, week);
                }}
              >
                {week}
              </button>
            );
          })}
        </div>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
