import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import "tailwindcss/tailwind.css";
import WorkoutDisplay from "./components/WorkoutDisplay";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
  });
  return (
    <> {" "}
    <div className="flex flex-col h-screen">
      <TopBar UserInfo={user} />
      <WorkoutDisplay className="flex flex-row h-screen w-screen" />
    </div></>

  );
}

export default App;
