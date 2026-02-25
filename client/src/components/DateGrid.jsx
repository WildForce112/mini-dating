export default function DateGrid({  }){
  const startHour = 8;
  const endHour = 22;
  const hours = Array.from(
    { length: endHour - startHour + 1},
    (_, i) => startHour + i,
  )
  const today = new Date();
  const days = Array.from(
    { length: 21 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    }
  )
  return(
    <div style={{
      display: "grid",
      gridTemplateColumns: `100px repeat(${hours.length}, 1fr)`,
      gap: "4px",
    }}>
      {/* Top left cell */}
      <div></div>
      {/* Time header row */}
      {hours.map((hour) => (
        <>
          {/* Time label */}
          <div key={`time=${hour}`} style={{ fontWeight: "bold" }}>
            {hour}:00
          </div>
        </>
      ))}

      {days.map((date, index) => {
        return [
          <div key={`date-${index}`} style={{ fontWeight: "bold" }}>
            {date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </div>,

          ...hours.map((hour) => (
            <input
              key={`cell-${index}-${hour}`}
              type="checkbox"
              style={{ margin: "auto" }}
            />
          )),
        ];
      })}
    </div>
  )
}