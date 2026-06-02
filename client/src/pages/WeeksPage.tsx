import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/weeks/WeeksPage.css";

export default function WeeksPage() {

  const navigate = useNavigate();

  const currentDate = new Date();

  const currentWeek = getISOWeek(currentDate);

  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] =
    useState(currentYear);

  const availableYears = [];

  for (
    let y = currentYear - 5;
    y <= currentYear + 5;
    y++
  ) {
    availableYears.push(y);
  }

  function handleWeekClick(
    year: number,
    week: number
  ) {
    navigate(`/week/${year}/${week}`);
  }

  return (
    <div className="weeks-container">

      <div className="weeks-header">

        <h1 className="weeks-title">
          Weekly Tracker
        </h1>

        <select
          className="year-select"
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(Number(e.target.value))
          }
        >

          {availableYears.map((year) => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}

        </select>

      </div>

      <div className="weeks-grid">

        {Array.from({
          length: getISOWeeksInYear(selectedYear),
        }).map((_, index) => {

          const week = index + 1;

          const isCurrent =
            week === currentWeek &&
            selectedYear === currentYear;

          return (
            <button
              key={week}
              className={`week-card ${
                isCurrent
                  ? "current-week"
                  : ""
              }`}
              onClick={() =>
                handleWeekClick(
                  selectedYear,
                  week
                )
              }
            >
              Week {week}
            </button>
          );
        })}

      </div>

    </div>
  );
}

function getISOWeek(date: Date): number {

  const tempDate = new Date(date);

  tempDate.setHours(0, 0, 0, 0);

  tempDate.setDate(
    tempDate.getDate() +
    3 -
    ((tempDate.getDay() + 6) % 7)
  );

  const week1 = new Date(
    tempDate.getFullYear(),
    0,
    4
  );

  return (
    1 +
    Math.round(
      (
        (
          tempDate.getTime() -
          week1.getTime()
        ) /
        86400000 -
        3 +
        ((week1.getDay() + 6) % 7)
      ) /
      7
    )
  );
}

function getISOWeeksInYear(
  year: number
): number {

  const d = new Date(year, 11, 31);

  const week = getISOWeek(d);

  return week === 1 ? 52 : week;
}