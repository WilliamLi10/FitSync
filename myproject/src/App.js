import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import "tailwindcss/tailwind.css";
import WorkoutContainer from "./WorkoutContainer";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
  });

  return (
    <div className="flex flex-col h-screen">
      <TopBar UserInfo={user} />
      <div className="flex flex-row h-screen w-screen">
        <SideBar />
        <div className="flex flex-row h-screen w-5/6">
          <WorkoutContainer dayOfWeek="Sun" date="10" />
          <WorkoutContainer dayOfWeek="Mon" date="11" />
          <WorkoutContainer dayOfWeek="Tue" date="12" />
          <WorkoutContainer dayOfWeek="Wed" date="13" />
          <WorkoutContainer dayOfWeek="Thu" date="14" />
          <WorkoutContainer dayOfWeek="Fri" date="15" />
          <WorkoutContainer dayOfWeek="Sat" date="16" />
        </div>
      </div>
    </div>
  );
}

export default App;
