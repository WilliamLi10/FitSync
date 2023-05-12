import { useState } from "react";
const WorkoutContainer = (props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <div className="h-screen w-[14.28%] my-2 border-r-[1px]  border-gray border-solid">
      <div className = " h-20 text-center border-b-[1px] border-gray border-solid">
        <div className = "text-xs">{props.dayOfWeek}</div>
        <div className=" text-2xl ">{props.date}</div>
      </div>
      <div
      className=""
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={props.handleDrop}
      ></div>
    </div>
  );
};

export default WorkoutContainer;
