import { useState } from "react";
const WorkoutContainer = (props) => {
  return (
    <div className="h-screen w-[14.28%] my-2 border-r-[1px]  border-gray border-solid">
      <div className = " h-[10%] text-center border-b-[1px] border-gray border-solid">
        <div className = "text-2xl">{props.dayOfWeek}</div>
        <div className=" text-3xl ">{props.date}</div>
      </div>
      <div
      className="h-[90%] bg-gray-300"
      >
        {props.workout ? props.workout : ""}
      </div>
    </div>
  );
};

export default WorkoutContainer;
