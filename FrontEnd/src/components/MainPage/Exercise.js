import { useState } from "react";

const Exercise = (props) => {
  const [drop, setDrop] = useState(false);

  const dropHandler = () => {
    setDrop((prevDrop) => !prevDrop);
  };

  return (
    <div className="my-10 text-lg">
      <p onClick={dropHandler}>{props.exercise.Name}</p>
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
