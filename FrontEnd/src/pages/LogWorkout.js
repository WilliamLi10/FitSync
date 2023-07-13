import { useState } from "react";
import moment from "moment";
import Exercise from "../components/LogWorkout/Exercise";

const LogWorkout = () => {
  const [day, setDay] = useState(moment());

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
      },
      {
        Name: "Exercise 2",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
      },
      {
        Name: "Exercise 3",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
      },
      {
        Name: "Exercise 4",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
      },
    ],
    Unit: { Weight: "lb", Rest: "sec" },
  });

  return (
    <div className="bg-gray-50 min-h-screen w-screen px-10 py-5 min-w-[950px] mt-16">
      <div className="bg-white mb-5 px-4 py-3 shadow-sm rounded-md w-full flex flex-col">
        <div className="font-thin">{`${day.format("dddd")}, ${day.format(
          "MMMM"
        )} ${day.format("DD")}, ${day.format("YYYY")}`}</div>
        <div className="text-2xl font-semibold">{workout.Name}</div>
      </div>
      {workout.Exercises.map((exercise) => {
        return (
          <Exercise
            exercise={exercise}
            key={exercise.Name}
            unit={workout.Unit}
          />
        );
      })}
    </div>
  );
};

export default LogWorkout;
