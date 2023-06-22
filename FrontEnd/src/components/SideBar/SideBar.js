import { useState } from "react";
import {
  RiCompassDiscoverLine,
  RiFileList2Line,
  RiAddLine,
} from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import SideBarSelector from "./SideBarSelector";
import MyWorkouts from "../Programs/MyWorkouts";
import DiscoverWorkouts from "../Programs/DiscoverWorkouts";
import CreateProgram from "../../pages/CreateProgram";

const SideBar = (props) => {
  const [selectedOption, setSelectedOption] = useState("myPrograms");

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  const [barOpen, setBarOpen] = useState(true);

  const barHandler = () => {
    setBarOpen((prevBarOpen) => !prevBarOpen);
  };

  return (
    <div className="flex flex-row h-screen">
      <div
        className={`h-screen bg-gray-800 transition-all duration-300 transform ${
          barOpen ? "w-1/6 " : "w-[78px]"
        }`}
        style={{ minWidth: barOpen ? "250px" : "0" }}
      >
        <SideBarSelector
          onClick={barHandler}
          image={<FaBars className="h-8 w-8" />}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("myPrograms")}
          desc={barOpen && "My Programs"}
          image={<RiFileList2Line className="h-8 w-8" />}
          className={selectedOption === "myPrograms" ? "bg-gray-500" : ""}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("discoverPrograms")}
          desc={barOpen && "Discover New Programs"}
          image={<RiAddLine className="h-8 w-8" />}
          className={selectedOption === "discoverPrograms" ? "bg-gray-500" : ""}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("createProgram")}
          desc={barOpen && "Create New Program"}
          image={<RiCompassDiscoverLine className="h-8 w-8" />}
          className={selectedOption === "createProgram" ? "bg-gray-500" : ""}
        />
      </div>
      <div
        className={`h-screen w-screen flex ${
          selectedOption === "createProgram" && "justify-center"
        }`}
      >
        {selectedOption === "myPrograms" && <MyWorkouts />}
        {selectedOption === "discoverPrograms" && <DiscoverWorkouts />}
        {selectedOption === "createProgram" && <CreateProgram />}
      </div>
    </div>
  );
};

export default SideBar;
