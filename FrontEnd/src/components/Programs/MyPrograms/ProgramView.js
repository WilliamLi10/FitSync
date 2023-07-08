import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import Workout from "./Workout";

const ProgramView = (props) => {
  const isEditor = true;
  const [title, setTitle] = useState("Untitled");
  const [workouts, setWorkouts] = useState([]);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const workoutHandler = (workout, index) => {
    setWorkouts((prevWorkouts) => {
      const newWorkouts = [...prevWorkouts];
      newWorkouts[index] = workout;
      return newWorkouts;
    });
  };

  const addWorkout = () => {
    setWorkouts([...workouts, { Name: "Untitled", Exercises: [] }]);
  };

  const removeWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
  };

  const duplicateWorkout = (index) => {
    const newWorkouts = [...workouts];
    const workoutToDuplicate = newWorkouts[index];
    newWorkouts.splice(index + 1, 0, { ...workoutToDuplicate });
    setWorkouts(newWorkouts);
  };

  const moveWorkout = (index, newIndex) => {
    const newWorkouts = [...workouts];
    const workout = newWorkouts.splice(index, 1)[0];
    newWorkouts.splice(newIndex, 0, workout);
    setWorkouts(newWorkouts);
  };

  return (
    <form>
      <div className="flex flex-row items-center">
        <button onClick={props.close}>
          <BiArrowBack className="h-8" />
        </button>
        <input
          value={title}
          type="text"
          onChange={titleHandler}
          disabled={!isEditor}
          className="border-none bg-gray-50 pl-2 ml-2 h-6 py-1 rounded-md transition-all duration-300 hover:border-solid hover:border-[1px] focus:border-none"
        />
      </div>
      {workouts.map((workout, index) => {
        return (
          <Workout
            key={index}
            workout={workout}
            workouts={workouts}
            update={workoutHandler}
            delete={removeWorkout}
            duplicate={duplicateWorkout}
            move={moveWorkout}
            index={index}
          />
        );
      })}
      <div className="flex flex-row justify-between">
        <button
          className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 mt-5 hover:bg-slate-100"
          onClick={addWorkout}
          type="button"
        >
          <RiAddLine /> &#160;Add Workout
        </button>
        <button className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 mt-5 hover:bg-slate-100">
          <CiSaveDown2 />
          &#160;Save Program
        </button>
      </div>
    </form>
  );
};

export default ProgramView;
