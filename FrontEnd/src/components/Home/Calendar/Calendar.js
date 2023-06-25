import CalendarDay from "./CalendarDay";

const Calendar = (props) => {
  return (
    <div className="w-full ml-10 bg-white py-4 flex flex-col rounded-md shadow-sm">
      <div className="text-2xl text-center mb-5">
        {`${props.week[3].month} ${props.week[3].year}`}
      </div>
      <div className="flex justify-center flex-grow">
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
