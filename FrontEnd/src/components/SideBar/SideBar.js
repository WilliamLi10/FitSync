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

const SideBar = () => {
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
        className={`h-screen transition-all duration-300 transform border-solid border-r-[1px] border-slate-700 ${
          barOpen ? "w-1/6 " : "w-[60px]"
        }`}
        style={{ minWidth: barOpen ? "250px" : "60px" }}
      >
        <SideBarSelector
          onClick={barHandler}
          desc={barOpen && "Programs"}
          image={<FaBars />}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("myPrograms")}
          desc={barOpen && "My Programs"}
          image={<RiFileList2Line />}
          className={selectedOption === "myPrograms" ? "bg-slate-100" : ""}
        />
        <SideBarSelector
          onClick={() => handleOptionClick("discoverPrograms")}
          desc={barOpen && "Discover New Programs"}
          image={<RiAddLine />}
          className={
            selectedOption === "discoverPrograms" ? "bg-slate-100" : ""
          }
        />
        <SideBarSelector
          onClick={() => handleOptionClick("createProgram")}
          desc={barOpen && "Create New Program"}
          image={<RiCompassDiscoverLine />}
          className={selectedOption === "createProgram" ? "bg-slate-100" : ""}
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
