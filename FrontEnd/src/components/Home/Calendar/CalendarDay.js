import moment from "moment";
import CalendarWorkout from "./CalendarWorkout";

const CalendarDay = (props) => {
  const isToday = moment(moment().toISOString()).isSame(props.date, "day");

  const workout = {
    Name: "Workout 1",
    ID: 1,
    Date: "Monday, June 26, 2023",
    Exercises: [
      {
        Name: "Exercise 1",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
        TimeUnit: 2,
        Notes: "Notes for Exercise 1",
      },
      {
        Name: "Exercise 2",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
        TimeUnit: 2,
        Notes: "Notes for Exercise 2",
      },
      {
        Name: "Exercise 3",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
        TimeUnit: 2,
        Notes: "Notes for Exercise 3",
      },
      {
        Name: "Exercise 4",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
        TimeUnit: 2,
        Notes: "Notes for Exercise 4",
      },
    ],
  };

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
        {Object.keys(workout).length !== 0 && (
          <CalendarWorkout workout={workout} />
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
