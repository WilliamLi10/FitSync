import { useState } from "react";
import {
  RiCompassDiscoverLine,
  RiFileList2Line,
  RiAddLine,
} from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import SideBarSelector from "./SideBarSelector";
import MyPrograms from "../../../pages/MyPrograms";
import DiscoverProgram from "../../../pages/DiscoverProgram";
import CreateProgram from "../../../pages/CreateProgram";

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
        className={`h-screen transition-all duration-300 transform ${
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
          className={
            selectedOption === "myPrograms" &&
            "bg-slate-100 border-solid border-r-[1px] border-slate-700"
          }
        />
        <SideBarSelector
          onClick={() => handleOptionClick("discoverPrograms")}
          desc={barOpen && "Discover New Programs"}
          image={<RiAddLine />}
          className={
            selectedOption === "discoverPrograms" &&
            "bg-slate-100 border-solid border-r-[1px] border-slate-700"
          }
        />
        <SideBarSelector
          onClick={() => handleOptionClick("createProgram")}
          desc={barOpen && "Create New Program"}
          image={<RiCompassDiscoverLine />}
          className={
            selectedOption === "createProgram" &&
            "bg-slate-100 border-solid border-r-[1px] border-slate-700"
          }
        />
      </div>
      <div
        className={`h-screen w-screen flex ${
          selectedOption === "createProgram" && "justify-center"
        }`}
      >
        {selectedOption === "myPrograms" && <MyPrograms />}
        {selectedOption === "discoverPrograms" && <DiscoverProgram />}
        {selectedOption === "createProgram" && <CreateProgram />}
      </div>
    </div>
  );
};

export default SideBar;
