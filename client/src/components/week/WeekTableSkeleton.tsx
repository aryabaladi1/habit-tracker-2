import "../../styles/weeks/WeekTableSkeleton.css";

export default function WeekTableSkeleton() {
  return (
    <div className="week-table-container">

      <table className="week-table">

        <thead>
          <tr>
            <th>Habit</th>
            <th>Goal</th>

            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i}>
                <div className="skeleton skeleton-header" />
              </th>
            ))}

            <th>Total</th>
            <th>Imbalance</th>
          </tr>
        </thead>


        <tbody>

          {Array.from({ length: 5 }).map((_, row) => (

            <tr key={row}>

              <td>
                <div className="skeleton skeleton-habit" />
              </td>

              <td>
                <div className="skeleton skeleton-small" />
              </td>


              {Array.from({ length: 7 }).map((_, col) => (
                <td key={col}>
                  <div className="skeleton skeleton-cell" />
                </td>
              ))}


              <td>
                <div className="skeleton skeleton-small" />
              </td>

              <td>
                <div className="skeleton skeleton-small" />
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}