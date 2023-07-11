import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import Workout from "./Workout";
import Error from "./Error";
import Success from "./Success";

const ProgramView = (props) => {
  const isEditor = true;
  const [title, setTitle] = useState("Untitled");
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const workoutHandler = (workout, index) => {
    setWorkouts((prevWorkouts) => {
      const newWorkouts = [...prevWorkouts];
      newWorkouts[index] = workout;
      console.log(newWorkouts);
      return newWorkouts;
    });
    setSuccess(false);
    setError("");
  };

  const addWorkout = () => {
    setWorkouts([
      ...workouts,
      { Name: "Untitled", Exercises: [], Unit: { weight: "lb", rest: "min" } },
    ]);
    setSuccess(false);
    setError("");
  };

  const removeWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
    setSuccess(false);
    setError("");
  };

  const duplicateWorkout = (index) => {
    const newWorkouts = [...workouts];
    const workoutToDuplicate = newWorkouts[index];
    newWorkouts.splice(index + 1, 0, { ...workoutToDuplicate });
    setWorkouts(newWorkouts);
    setSuccess(false);
    setError("");
  };

  const moveWorkout = (index, newIndex) => {
    const newWorkouts = [...workouts];
    const workout = newWorkouts.splice(index, 1)[0];
    newWorkouts.splice(newIndex, 0, workout);
    setWorkouts(newWorkouts);
    setSuccess(false);
    setError("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let hasError = false;
    for (let i = 0; i < workouts.length; i++) {
      if (workouts[i].Exercises.length === 0) {
        setError("Workouts must have at least one exercise");
        hasError = true;
        break;
      }
      for (let j = 0; j < workouts[i].Exercises.length; j++) {
        const exercise = workouts[i].Exercises[j];
        const set = Number(exercise.Sets);
        const rep = Number(exercise.Reps);
        const weight = Number(exercise.Weight);
        const rest = Number(exercise.Rest);
        if (isNaN(set) || set <= 0 || !Number.isInteger(set)) {
          setError(`Invalid sets in workout: ${workouts[i].Name}`);
          hasError = true;
          break;
        }
        if (isNaN(rep) || rep <= 0 || !Number.isInteger(rep)) {
          setError(`Invalid reps in workout: ${workouts[i].Name}`);
          hasError = true;
          break;
        }
        if (
          isNaN(weight) ||
          weight < 0 ||
          workouts[i].Exercises[j].Weight === ""
        ) {
          setError(`Invalid weight in workout: ${workouts[i].Name}`);
          hasError = true;
          break;
        }
        if (isNaN(rest) || rest < 0 || workouts[i].Exercises[j].Rest === "") {
          setError(`Invalid rest in workout: ${workouts[i].Name}`);
          hasError = true;
          break;
        }
      }
    }
    if (hasError) {
      return;
    }
    setError("");
    setSuccess(true);
  };

  return (
    <form>
      <div className="flex flex-row items-center">
        <button onClick={props.close}>
          <BiArrowBack className="h-8" />
        </button>
        <input
          value={title}
          placeholder="Untitled"
          type="text"
          onChange={titleHandler}
          disabled={!isEditor}
          className="border-none bg-gray-50 pl-2 ml-2 h-6 py-1 rounded-md transition-all duration-300 hover:border-solid hover:border-[1px] focus:border-none"
        />
      </div>
      {error && <Error msg={error} />}
      {success && <Success />}
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
        <button
          className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 mt-5 hover:bg-slate-100"
          type="submit"
          onClick={submitHandler}
        >
          <CiSaveDown2 />
          &#160;Save Program
        </button>
      </div>
    </form>
  );
};

export default ProgramView;
