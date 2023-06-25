import { useRef, useEffect } from "react";
import Exercise from "./Exercise";

const SelectedWorkout = (props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.close();
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  return (
    <div
      className="fixed rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2] bg-white w-[60%]"
      ref={modalRef}
    >
      <div className="text-3xl font-semibold py-4 px-6">{props.workout.Name}</div>
      <div className="bg-slate-100 px-4 py-1 rounded-b-xl">
        {props.workout.Exercises.map((exercise) => {
          return <Exercise exercise={exercise} />;
        })}
        <button
          onClick={props.close}
          className="bg-slate-700 text-white text-xl px-4 py-1 font-medium mb-5 hover:bg-slate-600 transition"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default SelectedWorkout;
