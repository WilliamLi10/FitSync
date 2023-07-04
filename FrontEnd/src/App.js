import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import SideBar from "./components/Programs/SideBar/SideBar";
import Progress from "./pages/Progress";
import LogWorkout from "./pages/LogWorkout";
import ProgramView from "./components/ProgramView";

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
              <Home />
            </div>
          }
        />
        <Route path="/Programs" element={<SideBar />} />
        <Route path="/Progress" element={<Progress />} />
        <Route path="/LogWorkout" element={<LogWorkout />} />
        <Route path="/ProgramView" element={<ProgramView />} />
      </Routes>
    </div>
  );
}

export default App;
