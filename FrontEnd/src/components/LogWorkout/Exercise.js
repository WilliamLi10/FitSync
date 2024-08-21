import { useState, useReducer } from "react";
import Error from "../Error";
import Success from "../Success";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "reps":
      return {
        ...state,
        reps: state.reps.map((value, index) =>
          index === action.set ? action.rep : value
        ),
      };
    case "weights":
      return {
        ...state,
        weights: state.weights.map((value, index) =>
          index === action.set ? action.weight : value
        ),
      };
    case "notes":
      return {
        ...state,
        notes: action.notes,
      };
    default:
      return state;
  }
};

const Exercise = (props) => {
  const [open, setOpen] = useState(true);

  const openHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [data, setData] = useReducer(dataReducer, {
    reps: Array(props.exercise.sets).fill(props.exercise.reps),
    weights: Array(props.exercise.sets).fill(props.exercise.weight),
    notes: "",
  });

  const repsHandler = (index) => (event) => {
    setData({ type: "reps", set: index, rep: event.target.value });
  };

  const weightsHandler = (index) => (event) => {
    setData({ type: "weights", set: index, weight: event.target.value });
  };

  const notesHandler = (event) => {
    setData({ type: "notes", notes: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    for (let i = 0; i < data.reps.length; i++) {
      const rep = Number(data.rep[i]);
      const weight = Number(data.weight[i]);
    }
  };

  const tableCSS = "flex-col flex font-thin";
  const titleCSS = "bg-slate-200 text-center";
  const itemCSS =
    "text-center border-solid border-r-[1px] border-slate-200 py-1 border-b-[1px] flex-grow";
  const inputCSS =
    "border-solid border-[1px] text-center w-9 transition-all duration-150 hover:border-slate-400";

  return (
    <form className="min-w-[500px] mb-5" onSubmit={submitHandler}>
      <div
        onClick={openHandler}
        className={`font-thin cursor-pointer ${
          !open && "border-solid border-b-2"
        }`}
      >
        {props.exercise.name}
      </div>
      {open && (
        <div className="flex flex-row justify-between bg-white">
          <div className={`${tableCSS} w-[10%]`}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Sets
            </div>
            {Array.from({ length: props.exercise.sets }, (_, index) => (
              <div className={`${itemCSS} border-l-[1px]`} key={index}>
                {index + 1}
              </div>
            ))}
          </div>
          <div className={`${tableCSS} w-[10%]`}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Reps
            </div>
            {Array.from({ length: props.exercise.sets }, (_, index) => (
              <div key={index} className={itemCSS}>
                <input
                  placeholder={props.exercise.reps}
                  className={inputCSS}
                  value={data.reps[index]}
                  onChange={repsHandler(index)}
                />
              </div>
            ))}
          </div>
          <div className={`${tableCSS} w-[10%]`}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Intensity ({props.exercise.intensity})
            </div>
            {Array.from({ length: props.exercise.sets }, (_, index) => (
              <div key={index} className={itemCSS}>
                <input
                  placeholder={props.exercise.intensity}
                  className={inputCSS}
                  value={data.weights[index]}
                  onChange={weightsHandler(index)}
                />
              </div>
            ))}
          </div>
          <div className={`${tableCSS} w-[10%]`}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Rest
            </div>
            {Array.from({ length: props.exercise.sets }, (_, index) => (
              <div className={`${itemCSS} border-r-[1px]`} key={index}>
                {props.exercise.rest}
              </div>
            ))}
          </div>
          <div className={`${tableCSS} w-[30%]`}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Notes
            </div>
            <textarea
              className="w-full flex-grow border-b-[1px] border-t-0 border-l-0 border-r-[1px] border-slate-200 focus:ring-slate-300 focus:border-slate-200"
              value={data.notes}
              onChange={notesHandler}
            />
          </div>
          <div className={`${tableCSS} w-[30%]`}>
            <div className={titleCSS}>Description</div>
            <div className="px-2 border-solid border-b-[1px] border-r-[1px] flex-grow text-gray-500">
              {props.exercise.description}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-end">
        <button
          type="submit"
          className="bg-slate-700 text-white transition-all duration-300 px-4 py-2 mt-3 hover:bg-slate-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Exercise;
