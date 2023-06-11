import { useState } from "react";
import moment from "moment";

const WorkoutContainer = (props) => {
  const isToday = moment().isSame(moment(props.date), "day");

  return (
    <div
      className={`h-screen w-[14.28%] my-2 border-gray border-solid min-w-[100px] ${
        props.dayOfWeek != "Saturday" ? "border-r-[1px]" : ""
      }`}
    >
      <div className="h-[70px] text-center border-b-[1px] border-gray border-solid">
        <div
          className={`text-1xl font-semibold  ${
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
      <div className="h-[90%]">{props.workout ? props.workout : ""}</div>
    </div>
  );
};

export default WorkoutContainer;
