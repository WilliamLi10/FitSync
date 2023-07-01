import { useState, useReducer } from "react";
import CreateProgramForm from "../components/Programs/CreateProgram/CreateProgramForm";
import CreateProgramWorkout from "../components/Programs/CreateProgram/CreateProgramWorkout";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "form":
      return {
        ...state,
        form: action.data,
      };
    case "workout":
      return {
        ...state,
        workout: action.data,
      };
    default:
      return state;
  }
};

const CreateProgram = () => {
  const [curr, setCurr] = useState("form");
  const [data, setData] = useReducer(dataReducer, {
    form: {
      title: { value: "", valid: false },
      desc: { value: "" },
      dur: { value: "", valid: false },
      freq: { value: "" },
      next: false,
    },
    workout: {},
  });

  const formNext = (formData) => {
    setCurr("workout");
    setData({ type: "form", data: formData });
  };

  const workoutPrev = (workData) => {
    setCurr("form");
    setData({ type: "workout", data: workData });
  };

  return (
    <div className="bg-gray-50 h-full flex justify-center">
      {curr === "form" && (
        <CreateProgramForm pageHandler={formNext} data={data.form} />
      )}
      {curr === "workout" && (
        <CreateProgramWorkout pageHandler={workoutPrev} data={data.workout} />
      )}
    </div>
  );
};

export default CreateProgram;
