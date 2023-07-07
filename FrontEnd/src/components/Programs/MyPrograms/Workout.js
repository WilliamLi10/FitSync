import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import WorkoutDrop from "./WorkoutDrop";

const Workout = (props) => {
  const dropRef = useRef(null);

  const [drop, setDrop] = useState(false);
  const dropHandler = () => {
    setDrop((prevDrop) => !prevDrop);
  };

  const [exercises, setExercises] = ([])
  const [currExercises, setCurrExercises]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDrop(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropRef]);

  const itemCSS = "flex-grow text-center border-solid border-white";

  return (
    <div className="min-w-[500px] mt-5">
      <div className="flex flex-row items-center">
        <input
          className="font-thin rounded-md pl-2 h-6 mb-1 bg-gray-50 border-slate-300 hover:border-solid hover:border-[1px] hover:border-slate-700 focus:border-none"
          value="Untitled"
          type="text"
        />
        <div onClick={dropHandler} className="cursor-pointer" ref={dropRef}>
          <IoMdArrowDropdown className="ml-1 rounded-full hover:border-solid hover:border-[1px] hover:border-slate-500" />
          {drop && <WorkoutDrop />}
        </div>
      </div>
      <div className="flex flex-row font-thin bg-slate-200">
        <div className={`${itemCSS} border-r-[1px]`}>Exercise</div>
        <div className={`${itemCSS} border-r-[1px]`}>Sets</div>
        <div className={`${itemCSS} border-r-[1px]`}>Reps</div>
        <div className={`${itemCSS} border-r-[1px]`}>Weights</div>
        <div className={itemCSS}>Description</div>
      </div>
    </div>
  );
};

export default Workout;
