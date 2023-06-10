import { useState } from "react";
import moment from "moment";

const WorkoutContainer = (props) => {
  const isToday = moment().isSame(moment(props.date), "day");

  return (
    <div className="h-screen w-[14.28%] my-2 border-r-[1px]  border-gray border-solid ">
      <div className="h-[10%] text-center border-b-[1px] border-gray border-solid">
        <div
          className={`text-1xl ${isToday ? "text-blue-600" : "text-gray-500"}`}
        >
          {props.dayOfWeek.slice(0, 3).toUpperCase()}
        </div>
        <div
          className={`text-2xl ${
            isToday ? "text-white bg-blue-600 rounded-full" : "text-gray-500"
          }`}
        >
          {parseInt(props.day)}
        </div>
      </div>
      <div className="h-[90%]">
        {props.workout ? props.workout : ""}
      </div>
    </div>
  );
};

export default WorkoutContainer;
