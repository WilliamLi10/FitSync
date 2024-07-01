import { TfiReload } from "react-icons/tfi";
import { RiAddLine } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import { LuCopy } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Workout = (props) => {
  const restSwitcher = () => {
    props.update(
      {
        ...props.workout,
        Unit: {
          ...props.workout.Unit,
          rest: props.workout.Unit.rest === "sec" ? "min" : "sec",
        },
      },
      props.index
    );
  };

  const intensitySwitcher = () => {
    props.update(
      {
        ...props.workout,
        Unit: {
          ...props.workout.Unit,
          intensity: props.workout.Unit.intensity === "RPE" ? "%ORM" : "RPE",
        },
      },
      props.index
    );
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

  const intensityHandler = (event, index) => {
    const newExercises = [...props.workout.Exercises];
    newExercises[index].Intensity = event.target.value;
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
      Intensity: "",
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
          className={`${titleCSS} border-r-[1px] w-[21%] flex flex-row items-center justify-center`}
        >
          Intensity ({props.workout.Unit.intensity})&#160;
          {(props.role === "owner" || props.role === "editor") && (
            <TfiReload
              className="h-3 cursor-pointer"
              onClick={intensitySwitcher}
            />
          )}
        </div>
        <div
          className={`${titleCSS} border-r-[1px] w-[15%] flex flex-row items-center justify-center`}
        >
          Rest ({props.workout.Unit.rest})&#160;
          {(props.role === "owner" || props.role === "editor") && (
            <TfiReload className="h-3 cursor-pointer" onClick={restSwitcher} />
          )}
        </div>
        <div className={`${titleCSS} w-[19%]`}>Description</div>
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
                                placeholder="Untitled"
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
                            <div className="w-[21%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
                              <input
                                value={exercise.Intensity}
                                onChange={(event) =>
                                  intensityHandler(event, index)
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
                            <div className="w-[19%] border-solid border-slate-200 border-r-[1px] border-b-[1px]">
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
