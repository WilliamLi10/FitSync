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
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2] bg-white w-[50%] pb-[20px] max-w-[500px] p-[40px]"
      ref={modalRef}
    >
      <p className="text-3xl">{props.workout.Name}</p>
      {props.workout.Exercises.map((exercise) => {
        return <Exercise exercise={exercise} />;
      })}
      <button
        onClick={props.close}
        className="bg-slate-700 text-white text-xl px-4 py-1 font-medium hover:bg-slate-600 transition"
      >
        Okay
      </button>
    </div>
  );
};

export default SelectedWorkout;
