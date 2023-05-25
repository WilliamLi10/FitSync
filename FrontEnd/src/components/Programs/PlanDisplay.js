import { useState } from "react";
import {
  RiCompassDiscoverLine,
  RiFileList2Line,
  RiAddLine,
} from "react-icons/ri";
import SideBarSelector from "./SideBarSelector";
import MyWorkouts from "./MyWorkouts";
import DiscoverWorkouts from "./DiscoverWorkouts";
import CreateWorkout from "./CreateWorkout";

const PlanDisplay = (props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="h-screen w-1/6 bg-gray-800">
        <SideBarSelector
          onClick={() => handleOptionClick("myPrograms")}
          desc="My Programs"
          image={<RiFileList2Line className="h-8 w-8" />}
          className={selectedOption === "myPrograms" ? "bg-gray-500" : ""}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("discoverPrograms")}
          desc="Discover New Programs"
          image={<RiAddLine className="h-8 w-8" />}
          className={selectedOption === "discoverPrograms" ? "bg-gray-500" : ""}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("createProgram")}
          desc="Create New Program"
          image={<RiCompassDiscoverLine className="h-8 w-8" />}
          className={selectedOption === "createProgram" ? "bg-gray-500" : ""}
        />
      </div>
      <div className=" w-5/6 h-screen">
        {selectedOption === "myPrograms" ? <MyWorkouts /> : <div></div>}
        {selectedOption === "discoverPrograms" ? <DiscoverWorkouts /> : <div></div>}
        {selectedOption === "createProgram" ? <CreateWorkout /> : <div></div>}
      </div>
    </div>
  );
};

export default PlanDisplay;
