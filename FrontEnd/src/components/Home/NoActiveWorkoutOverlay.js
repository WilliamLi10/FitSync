import { RiAddBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const NoActiveWorkoutOverlay = () => {
  return (
    <div className="fixed w-screen h-screen  flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur">
      <div className="bg-white p-8 text-center ">
        <h1 className="text-2xl">No Active Workout Program</h1>
        <Link to = "/WorkoutCreation" className = "text-blue-500 text-xl cursor-pointer hover:text-blue-800">Click here to select a program.</Link>
      </div>
    </div>
  );
};

export default NoActiveWorkoutOverlay;
