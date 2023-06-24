import { useState } from "react";
import moment from "moment";
import SelectedWorkout from "./SelectedWorkout";
import CalendarWorkout from "./CalendarWorkout";

const CalendarDay = (props) => {
  const isToday = moment(moment().toISOString()).isSame(props.date, "day");

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const workout = {
    Name: "Workout 1",
    ID: { $numberInt: "1" },
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
    ],
  };

  return (
    <div
      className={`h-screen w-[14.28%] my-2 border-gray border-solid min-w-[100px] ${
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
        {modal && <SelectedWorkout close={closeModal} workout={workout} />}
        {modal && (
          <div className="fixed top-[0] left-[0] w-[100%] h-[100%] bg-black opacity-[0.2] z-[1] transition duration-500" />
        )}
        {workout && <CalendarWorkout open={openModal} workout={workout} />}
      </div>
    </div>
  );
};

export default CalendarDay;
