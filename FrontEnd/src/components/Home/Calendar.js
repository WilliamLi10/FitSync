import CalendarDay from "./CalendarDay";

const Calendar = (props) => {
  return (
    <div className="w-full mt-5">
      <div className="text-2xl text-center mb-5">
        <p>{`${props.week[3].month} ${props.week[3].year}`}</p>
      </div>
      <div className="flex mr-7">
        {props.week.map((day) => {
          return (
            <CalendarDay
              key={`${day.month}/${day.day}/${day.year}`}
              dayOfWeek={day.dayOfWeek}
              date={day.date}
              day={day.day}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
