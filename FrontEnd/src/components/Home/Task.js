import { useState } from "react";

const Task = (props) => {
  const [day, setDay] = useState(props.day);

  const dayInc = () => {};

  const dayDec = () => {};

  return (
    <div className="bg-white mt-5 flex-grow rounded-md p-4">
      <div className="flex flex-row justify-between">
        <div>{day}</div>
        <div className="flex flex-row pt-1">
          <div
            className="w-3 h-3 border-solid border-l-4 border-t-4 border-black opacity-[17%] -rotate-45 cursor-pointer hover:opacity-[30%]"
            onClick={dayDec}
          />
          <div
            className="w-3 h-3 border-solid border-l-4 border-t-4 border-black opacity-[17%] rotate-[135deg] cursor-pointer hover:opacity-[30%]"
            onClick={dayInc}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
