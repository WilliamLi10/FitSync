import { useState, useReducer } from "react";
import moment from "moment";
import Exercise from "../components/LogWorkout/Exercise";

const dataReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const LogWorkout = () => {
  const [day, setDay] = useState(moment());

  const [data, setData] = useReducer(dataReducer, {});

  const [workout, setWorkout] = useState({
    Name: "Workout 1",
    ID: 1,
    Date: "Monday, June 26, 2023",
    Exercises: [
      {
        Name: "Exercise 1",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
        TimeUnit: 2,
        Notes: "Notes for Exercise 1",
      },
      {
        Name: "Exercise 2",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
        TimeUnit: 2,
        Notes: "Notes for Exercise 2",
      },
      {
        Name: "Exercise 3",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
        TimeUnit: 2,
        Notes: "Notes for Exercise 3",
      },
      {
        Name: "Exercise 4",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
        TimeUnit: 2,
        Notes: "Notes for Exercise 4",
      },
    ],
  });

  return (
    <form className="bg-gray-50 min-h-screen w-screen px-10 py-5 min-w-[700px] mt-16">
      <div className="bg-white mb-5 px-4 py-3 shadow-sm rounded-md w-full flex flex-col">
        <div className="font-thin">{`${day.format("dddd")}, ${day.format(
          "MMMM"
        )} ${day.format("DD")}, ${day.format("YYYY")}`}</div>
        <div className="text-2xl font-semibold">{workout.Name}</div>
      </div>
      {workout.Exercises.map((exercise) => {
        return <Exercise exercise={exercise} />;
      })}
      <div className="flex flex-row justify-end">
        <button className="px-5 py-2 text-white bg-slate-700 text-2xl font-thin hover:bg-slate-500 mb-10 mt-5">
          Save
        </button>
      </div>
    </form>
  );
};

export default LogWorkout;
