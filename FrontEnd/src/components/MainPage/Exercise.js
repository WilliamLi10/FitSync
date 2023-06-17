import { useState } from "react";

const Exercise = (props) => {
  const [drop, setDrop] = useState(false);

  const dropHandler = () => {
    setDrop((prevDrop) => !prevDrop);
  };

  return (
    <div className="my-10 text-lg">
      <p onClick={dropHandler}>
        <i className="border-solid border-black border-t-[3px] border-r-[3px] border-l-[0px] border-b-[0px] p-[3px] rotate-[135deg] inline-block"></i>
        {props.exercise.Name}
      </p>
      {drop && (
        <div>
          {props.exercise.Description && <p>{props.exercise.Description}</p>}
          <p>Weight: {props.exercise.Weight}</p>
          <p>Sets: {props.exercise.Sets}</p>
          <p>Reps: {props.exercise.Reps}</p>
          <p>Rest: {props.exercise.Rest}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise;
