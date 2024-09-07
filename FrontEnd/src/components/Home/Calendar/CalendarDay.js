import moment from "moment";
import CalendarWorkout from "./CalendarWorkout";

const CalendarDay = (props) => {
  const isToday = moment(moment().toISOString()).isSame(props.date, "day");

  return (
    <div
      className={`w-[14.28%] h-full my-2 border-gray border-solid ${
        props.dayOfWeek !== "Saturday" ? "border-r-[1px]" : ""
      }`}
    >
      <div className="h-[70px] text-center border-b-[1px] border-gray border-solid">
        <div
          className={`text-1xl font-light  ${
            isToday ? "text-slate-700" : "text-gray-500"
          }`}
        >
          {props.dayOfWeek.slice(0, 3).toUpperCase()}
        </div>
        <div
          className={`text-2xl ${
            isToday ? "text-white bg-slate-700 rounded-full" : "text-gray-500"
          }`}
        >
          {parseInt(props.day)}
        </div>
      </div>
      <div className="h-[90%]">
        {props.workouts.map((workout) => (
          <CalendarWorkout
            workout={workout.workoutData}
            name={workout.workoutName}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
