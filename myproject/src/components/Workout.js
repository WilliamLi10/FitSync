import { useState } from "react";
import MainExercise from "./MainExercise";
const Workout = (props) => {
  return (
    <div className="bg-white h-screen text-center">
      <h1 className="text-2xl">{props.workout.name}</h1>
      <p className="text-lg">{props.workout.time}</p>
      <div className="text-left mx-3">
        <section className="mb-2">
          <h1 className="text-lg">Warm-up</h1>
          <ul className=" text-s ml-6 mr-0" style={{ listStyleType: "line" }}>
            {props.workout.warmup.map((exercise) => (
              <li>
                <div className="flex justify-between">
                  <p>{exercise.Exercise}</p>{" "}
                  <p className="ml-auto">
                    {exercise.Duration + " " + exercise.Unit}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-2">
          <h1 className="text-lg">Main Lifts</h1>
        <ul className=" text-s ml-6 mr-0" style={{ listStyleType: "line" }}>
        {props.workout.mainExercises.map((exercise) => (
              <MainExercise exercise = {exercise}/>
            ))}
        </ul>
        </section>
        <section>
          <h1 className="text-lg">Accessories</h1>

          <ul className=" text-s ml-6 mr-0" style={{ listStyleType: "line" }}>
            {props.workout.accessories.map((exercise) => (
              <li>
                <div className="flex justify-between">
                  <div className="w-3/5">
                    <p>{exercise.Exercise}</p>{" "}
                    <p>
                      Weight:{" "}
                      {exercise.Weight != null ? exercise.Weight : "N/A"}
                    </p>
                    <p>
                      Rest:{" "+ exercise.Rest + " " + exercise.Unit}
                    </p>
                    <p>
                      {exercise.Notes != null ? "Notes: " + exercise.Notes : ""}
                    </p>
                  </div>

                  <p className="ml-auto">
                    {exercise.Reps != null
                      ? exercise.Sets + " x " + exercise.Reps
                      : exercise.Sets + " Sets"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Workout;
