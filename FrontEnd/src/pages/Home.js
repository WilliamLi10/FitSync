import { useState, useContext } from "react";
import Calendar from "../components/Home/Calendar/Calendar";
import MiniCalendar from "../components/Home/MiniCalendar/MiniCalendar";
import Dashboard from "../components/Home/Dashboard";
import Task from "../components/Home/Task/Task";
import Landing from "./LoggedOut/Landing";
import { checkAccessToken } from "../util/auth";
import StartProgramSuccessModal from "../components/Programs/StartProgramSuccessModal";
import WorkoutContext from "../context/workout-context";

const Home = () => {
  const ctx = useContext(WorkoutContext);

  return checkAccessToken() ? (
    <div className="flex flex-col h-screen w-screen bg-gray-50 px-10 py-5 min-w-[1200px]">
      {ctx.startProgramSuccessModal && <StartProgramSuccessModal />}
      {ctx.startProgramSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
      )}
      <div>
        <Dashboard />
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col">
          <MiniCalendar />
          <Task />
        </div>
        <Calendar />
      </div>
    </div>
  ) : (
    <Landing />
  );
};

export default Home;
