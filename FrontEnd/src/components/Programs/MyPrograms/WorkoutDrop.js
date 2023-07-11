import { useState } from "react";

const WorkoutDrop = (props) => {
  const [move, setMove] = useState(false);
  const moveHandler = (event) => {
    event.stopPropagation();
    setMove((prevMove) => !prevMove);
  };
  const moveSelect = (index) => {
    setMove(false);
    props.move(index);
  };

  const optionCSS = "transition-all duration-150 hover:bg-slate-200 px-2 py-1";

  return (
    <div className="flex flex-row absolute">
      <div className="flex flex-col border-solid border-[1px] bg-white h-min">
        <div className={optionCSS} onClick={moveHandler}>
          Move
        </div>
        <div className={optionCSS} onClick={props.duplicate}>
          Duplicate
        </div>
        <div className={optionCSS} onClick={props.delete}>
          Delete
        </div>
      </div>
      {move && (
        <div className="flex flex-col border-solid border-r-[1px] border-t-[1px] border-b-[1px] h-min bg-white">
          {props.workouts.map((workout, index) => (
            <div
              key={index}
              className={optionCSS}
              onClick={() => moveSelect(index)}
            >
              {workout.Name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutDrop;
