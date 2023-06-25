import { useState } from "react";
import ExerciseSet from "./ExerciseSet";

const Exercise = (props) => {
  const [drop, setDrop] = useState(false);

  const dropHandler = () => {
    setDrop((prevDrop) => !prevDrop);
  };

  const sets = Array.from({ length: props.exercise.Sets }, (_, index) => (
    <ExerciseSet
      key={index}
      val={index}
      isLast={index === props.exercise.Sets - 1}
    />
  ));

  return (
    <div className="my-5">
      <div
        onClick={dropHandler}
        className={`text-md font-semibold cursor-pointer px-4 py-3 shadow-sm hover:shadow-md rounded-t-xl ${
          drop ?  "bg-slate-700 text-white" : "rounded-b-xl text-black bg-white"
        }`}
      >
        {props.exercise.Name}
      </div>
      {drop && sets}
    </div>
  );
};

export default Exercise;
