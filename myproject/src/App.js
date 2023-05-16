import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import "tailwindcss/tailwind.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WorkoutDisplay from "./components/WorkoutDisplay";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
  });
  return (
    <DndProvider backend={HTML5Backend}>
      {" "}
      <div className="flex flex-col h-screen">
        <TopBar UserInfo={user} />
        <WorkoutDisplay className="flex flex-row h-screen w-screen" />
      </div>
    </DndProvider>
  );
}

export default App;
