import { useState } from "react";
import moment from "moment";
import Exercise from "../../components/LogWorkout/Exercise";
import { useLoaderData } from "react-router-dom";

const LogWorkout = () => {
  const [day, setDay] = useState(moment(useLoaderData().workouts[0]?.date));

  const [workouts, setWorkouts] = useState(useLoaderData().workouts);
  console.log(workouts);

  return (
    <div className="bg-gray-50 min-h-screen w-screen px-10 py-5 min-w-[950px]">
      {workouts.length > 0 ? (
        workouts.map((workout) => {
          return (
            <div>
              <div className="bg-white mb-5 px-4 py-3 shadow-sm rounded-md w-full flex flex-col">
                <div className="font-thin">{`${day.format(
                  "dddd"
                )}, ${day.format("MMMM")} ${day.format("DD")}, ${day.format(
                  "YYYY"
                )}`}</div>
                <div className="text-2xl font-semibold">
                  {workout.workoutName}
                </div>
              </div>
              {workout.workoutData.map((exercise) => {
                console.log(exercise);
                return (
                  <Exercise
                    exercise={exercise}
                    key={exercise.name}
                    unit={workout.Unit}
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <div className="bg-white mb-5 px-4 py-3 shadow-sm rounded-md w-full flex flex-col">
          <div className="font-thin">{`${day.format("dddd")}, ${day.format(
            "MMMM"
          )} ${day.format("DD")}, ${day.format("YYYY")}`}</div>
          <div className="text-2xl font-semibold">No workouts today!</div>
        </div>
      )}
    </div>
  );
};

export default LogWorkout;
