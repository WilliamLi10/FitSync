import { useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { RiAddLine } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import { LuCopy } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import { IoMdMove } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Workout = (props) => {
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

  const titleCSS = "text-center border-solid border-white bg-slate-200";
  const inputCSS = "w-full px-2 h-full border-none text-sm";

  return (
    <div className="min-w-[700px] mt-5">
      <div className="flex flex-row items-center">
        <input
          className={`font-thin rounded-md pl-2 h-6 mb-1 bg-gray-50 ${
            props.role === "viewer"
              ? "border-none"
              : "border-slate-300  hover:border-solid hover:border-[1px] hover:border-slate-700 focus:border-none"
          }`}
          value={props.workout.Name}
          onChange={workoutNameHandler}
          placeholder="Untitled"
          type="text"
          disabled={props.role === "viewer"}
        />
        {props.role !== "viewer" && (
          <div className="flex flex-row pl-2 text-gray-500 items-align">
            <FiEdit
              className="cursor-pointer"
              onClick={() => {
                props.setDrag((prevDrag) => !prevDrag);
              }}
            />
            <LuCopy
              className="ml-1 cursor-pointer"
              onClick={() => {
                props.copy(props.index);
              }}
            />
            {props.canDelete && (
              <BsTrash
                className="ml-1 cursor-pointer"
                onClick={() => {
                  props.delete(props.index);
                }}
              />
            )}
          </div>
        )}
      </div>
      <div
        className={`flex flex-row font-thin ${
          props.drag ? "w-[97%]" : "w-full"
        }`}
      >
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>Exercise</div>
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>Sets</div>
        <div className={`${titleCSS} border-r-[1px] w-[15%]`}>Reps</div>
        <div
          className={`${titleCSS} border-r-[1px] w-[15%] flex flex-row items-center justify-center`}
        >
          Weights ({weight ? "lb" : "kg"})&#160;
          <TfiReload className="h-3 cursor-pointer" onClick={weightSwitcher} />
        </div>
        <div
          className={`${titleCSS} border-r-[1px] w-[15%] flex flex-row items-center justify-center`}
        >
          Rest ({rest})&#160;
          <TfiReload className="h-3 cursor-pointer" onClick={restSwitcher} />
        </div>
        <div className={`${titleCSS} w-[25%]`}>Description</div>
      </div>
      <Droppable droppableId={`exercises-${props.index}`} type="exercise">
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.workout.Exercises.map((exercise, index) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={`exercise-${index}-${props.index}`}
                    index={index}
                  >
                    {(provided) => {
                      return (
                        <div
                          className="flex flex-row"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className="flex flex-grow flex-row">
                            <div className="w-[15%] border-solid border-slate-200 border-l-[1px] border-r-[1px] border-b-[1px]">
                              <input
                                value={exercise.Name}
                                onChange={(event) =>
                                  exerciseNameHandler(event, index)
                                }
                                type="text"
                                disabled={props.role === "viewer"}
                                className={`${inputCSS} text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                                }`}
                              />
                            </div>
                            <div className="w-[15%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
                              <input
                                key={index}
                                value={exercise.Sets}
                                onChange={(event) => setsHandler(event, index)}
                                type="number"
                                min="0"
                                disabled={props.role === "viewer"}
                                className={`${inputCSS} text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                                }`}
                              />
                            </div>
                            <div className="w-[15%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
                              <input
                                value={exercise.Reps}
                                onChange={(event) => repsHandler(event, index)}
                                type="number"
                                min="0"
                                disabled={props.role === "viewer"}
                                className={`${inputCSS} text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                                }`}
                              />
                            </div>
                            <div className="w-[15%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
                              <input
                                value={exercise.Weight}
                                onChange={(event) =>
                                  weightsHandler(event, index)
                                }
                                type="number"
                                min="0"
                                disabled={props.role === "viewer"}
                                className={`${inputCSS} text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                                }`}
                              />
                            </div>
                            <div className="w-[15%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
                              <input
                                value={exercise.Rest}
                                onChange={(event) => restHandler(event, index)}
                                type="number"
                                min="0"
                                disabled={props.role === "viewer"}
                                className={`${inputCSS} text-center ${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                                }`}
                              />
                            </div>
                            <div className="w-[25%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
                              <input
                                value={exercise.Description}
                                onChange={(event) =>
                                  descriptionHandler(event, index)
                                }
                                placeholder={
                                  props.role === "viewer" ? "" : "optional"
                                }
                                type="text"
                                disabled={props.role === "viewer"}
                                className={`${inputCSS} ${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-100"
                                }`}
                              />
                            </div>
                          </div>

                          <div
                            {...provided.dragHandleProps}
                            className={`flex flex-row items-center transition-all duration-150 ${
                              props.drag ? "w-[3%]" : "w-0"
                            }`}
                          >
                            <RxDragHandleDots2 className="w-6 h-6" />
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {props.role !== "viewer" &&
        (props.drag ? (
          <Droppable droppableId={`delete-${props.index}`} type="exercise">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div
                    className={`text-center font-thin text-sm border-solid border-[1px] py-2 border-red-500 bg-red-500 text-white transition-all duration-150 ${
                      props.drag ? "w-[97%]" : "w-full"
                    }`}
                  >
                    Drag exercises here to delete
                  </div>
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        ) : (
          <button
            className="font-thin border-solid border-[1px] py-2 bg-white text-sm flex flex-row w-full justify-center items-center transition-all duration-150 hover:bg-slate-100"
            type="button"
            onClick={addExercise}
          >
            <RiAddLine />
            &#160;Add Exercise
          </button>
        ))}
    </div>
  );
};

export default Workout;
