import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { RiAddLine } from "react-icons/ri";
import WorkoutDrop from "./WorkoutDrop";

const Workout = (props) => {
  const dropRef = useRef(null);
  const [drop, setDrop] = useState(false);
  const [weight, setWeight] = useState(true);
  const [rest, setRest] = useState("sec");

  const restSwitcher = () => {
    setRest((prevRest) => {
      switch (prevRest) {
        case "min":
          props.update(
            {
              ...props.workout,
              Unit: { rest: "hour", weight: weight ? "lb" : "kg" },
            },
            props.index
          );
          return "hour";
        case "hour":
          props.update(
            {
              ...props.workout,
              Unit: { rest: "sec", weight: weight ? "lb" : "kg" },
            },
            props.index
          );
          return "sec";
        case "sec":
          props.update(
            {
              ...props.workout,
              Unit: { rest: "min", weight: weight ? "lb" : "kg" },
            },
            props.index
          );
          return "min";
        default:
          props.update(
            {
              ...props.workout,
              Unit: { rest: "min", weight: weight ? "lb" : "kg" },
            },
            props.index
          );
          return "min";
      }
    });
  };

  const weightSwitcher = () => {
    setWeight((prevWeight) => {
      props.update(
        {
          ...props.workout,
          Unit: { weight: !prevWeight ? "lb" : "kg", rest: rest },
        },
        props.index
      );
      return !prevWeight;
    });
  };

  const dropHandler = () => {
    setDrop((prevDrop) => !prevDrop);
  };

  const deleteHandler = () => {
    props.delete(props.index);
  };

  const duplicateHandler = () => {
    props.duplicate(props.index);
  };

  const moveHandler = (newIndex) => {
    props.move(props.index, newIndex);
  };

  const workoutNameHandler = (event) => {
    props.update({ ...props.workout, Name: event.target.value }, props.index);
  };

  const exerciseNameHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Name = event.target.value;
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  const setsHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Sets = event.target.value;
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  const repsHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Reps = event.target.value;
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  const weightsHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Weight = event.target.value;
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  const descriptionHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Description = event.target.value;
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  const restHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Rest = event.target.value;
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  const addExercise = () => {
    const newExercises = [...props.workout.Exercises];
    newExercises.push({
      Name: "Untitled",
      Sets: "",
      Reps: "",
      Weight: "",
      Rest: "",
      Description: "",
    });
    props.update({ ...props.workout, Exercises: newExercises }, props.index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDrop(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropRef]);

  const titleCSS = "text-center border-solid border-white";
  const itemCSS =
    "w-full border-solid border-slate-200 border-b-[1px] border-r-[1px]";
  const inputCSS = "w-full px-2 h-full border-none text-sm";

  return (
    <div className="min-w-[700px] mt-5">
      <div className="flex flex-row items-center">
        <input
          className="font-thin rounded-md pl-2 h-6 mb-1 bg-gray-50 border-slate-300 hover:border-solid hover:border-[1px] hover:border-slate-700 focus:border-none"
          value={props.workout.Name}
          onChange={workoutNameHandler}
          placeholder="Untitled"
          type="text"
        />
        <div onClick={dropHandler} className="cursor-pointer" ref={dropRef}>
          <IoMdArrowDropdown className="ml-1 rounded-full hover:border-solid hover:border-[1px] hover:border-slate-500" />
          {drop && (
            <WorkoutDrop
              delete={deleteHandler}
              duplicate={duplicateHandler}
              move={moveHandler}
              workouts={props.workouts}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row font-thin bg-slate-200">
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>
          <div>Exercise</div>
          {props.workout.Exercises.map((_, index) => (
            <div key={index} className={`${itemCSS} border-l-[1px]`}>
              <input
                value={props.workout.Exercises[index].Name}
                onChange={(event) => exerciseNameHandler(event, index)}
                type="text"
                className={`${inputCSS} text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              />
            </div>
          ))}
        </div>
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>
          <div>Sets</div>
          {props.workout.Exercises.map((_, index) => (
            <div key={index} className={`${itemCSS}`}>
              <input
                key={index}
                value={props.workout.Exercises[index].Sets}
                onChange={(event) => setsHandler(event, index)}
                type="number"
                min="0"
                className={`${inputCSS} text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              />
            </div>
          ))}
        </div>
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>
          <div>Reps</div>
          {props.workout.Exercises.map((_, index) => (
            <div key={index} className={`${itemCSS}`}>
              <input
                key={index}
                value={props.workout.Exercises[index].Reps}
                onChange={(event) => repsHandler(event, index)}
                type="number"
                min="0"
                className={`${inputCSS} text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              />
            </div>
          ))}
        </div>
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>
          <div className="flex flex-row items-center justify-center">
            Weights ({weight ? "lb" : "kg"})&#160;
            <TfiReload
              className="h-3 cursor-pointer"
              onClick={weightSwitcher}
            />
          </div>
          {props.workout.Exercises.map((_, index) => (
            <div key={index} className={`${itemCSS}`}>
              <input
                key={index}
                value={props.workout.Exercises[index].Weight}
                onChange={(event) => weightsHandler(event, index)}
                type="number"
                min="0"
                className={`${inputCSS} text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              />
            </div>
          ))}
        </div>
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>
          <div className="flex flex-row items-center justify-center">
            Rest ({rest})&#160;
            <TfiReload className="h-3 cursor-pointer" onClick={restSwitcher} />
          </div>
          {props.workout.Exercises.map((_, index) => (
            <div key={index} className={`${itemCSS}`}>
              <input
                key={index}
                value={props.workout.Exercises[index].Rest}
                onChange={(event) => restHandler(event, index)}
                type="number"
                min="0"
                className={`${inputCSS} text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              />
            </div>
          ))}
        </div>
        <div className={`${titleCSS} w-[25%]`}>
          <div>Description</div>
          {props.workout.Exercises.map((_, index) => (
            <div key={index} className={`${itemCSS}`}>
              <input
                key={index}
                value={props.workout.Exercises[index].Description}
                onChange={(event) => descriptionHandler(event, index)}
                placeholder="optional"
                type="text"
                className={`${inputCSS} ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="font-thin border-solid border-[1px] py-2 bg-white text-sm flex flex-row w-full justify-center items-center transition-all duration-150 hover:bg-slate-100"
        type="button"
        onClick={addExercise}
      >
        <RiAddLine />
        &#160;Add Exercise
      </button>
    </div>
  );
};

export default Workout;
