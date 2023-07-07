import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import Workout from "./Workout";

const ProgramView = (props) => {
  const isEditor = true;

  const [title, setTitle] = useState("Untitled");
  const [workoutTitle, setWorkoutTitle] = useState("Workout 1");
  const [workouts, setWorkouts] = useState([]);
  const [currWorkout, setCurrWorkout] = useState("1");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const workoutTitleHandler = (event) => {
    setWorkoutTitle(event.target.value);
  };

  const addWorkout = () => {
    setWorkouts([...workouts, currWorkout]);
  };

  const removeWorkout = (index) => {
    const newWorkouts = [...workouts]
    newWorkouts.splice(index, 1)
    setWorkouts(newWorkouts)
  }

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
      {workouts.map((index) => (
        <Workout key={index} />
      ))}
      <button
        className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-300 mt-5 hover:bg-slate-100"
        onClick={addWorkout}
        type="button"
      >
        <RiAddLine /> &#160;Add Workout
      </button>
    </form>
  );
};

export default ProgramView;
