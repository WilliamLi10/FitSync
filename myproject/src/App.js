import { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
    <>
      <TopBar UserInfo={user} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col h-screen overflow-hidden">
              <WorkoutDisplay className="flex flex-row h-screen w-screen" />
            </div>
          }
        />
        <Route path="/WorkoutCreation" />
      </Routes>
    </>
  );
}

export default App;
