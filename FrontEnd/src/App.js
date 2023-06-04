import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import "tailwindcss/tailwind.css";
import WorkoutDisplay from "./components/MainPage/WorkoutDisplay";
import WorkoutCreator from "./components/Programs/PlanDisplay";

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
  });
  return (
    <div className="h-screen w-screen ">
      <TopBar UserInfo={user} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col h-screen ">
              <WorkoutDisplay className="flex flex-row h-screen w-screen" />
            </div>
          }
        />
        <Route path="/WorkoutCreation"element = {<WorkoutCreator />}/>
      </Routes>
    </div>
  );
}

export default App;
