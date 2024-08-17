import { useState } from "react";

const StartProgramWorkout = (props) => {
  return (
    <div className="flex mb-4 items-center text-sm justify-between">
      <p className="mr-5 font-thin">{props.name}</p>
      <select
        className="bg-slate-100"
        value={props.value}
        onChange={(event) => {
          props.updateDay({
            type: "workouts",
            value: event.target.value,
            name: props.name,
          });
        }}
      >
        <option value={1}>Monday</option>
        <option value={2}>Tuesday</option>
        <option value={3}>Wednesday</option>
        <option value={4}>Thursday</option>
        <option value={5}>Friday</option>
        <option value={6}>Saturday</option>
        <option value={7}>Sunday</option>
      </select>
    </div>
  );
};

export default StartProgramWorkout;
