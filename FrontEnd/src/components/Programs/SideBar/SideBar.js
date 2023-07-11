import { useState, useEffect, useRef } from "react";
import { RiCompassDiscoverLine, RiFileList2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import SideBarSelector from "./SideBarSelector";
import MyPrograms from "../../../pages/MyPrograms";
import DiscoverProgram from "../../../pages/DiscoverProgram";

const SideBar = () => {
  const sideBarRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState("myPrograms");

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setBarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [barOpen, setBarOpen] = useState(false);

  const barHandler = () => {
    setBarOpen((prevBarOpen) => !prevBarOpen);
  };

  return (
    <div className="flex flex-row h-screen mt-16bar w-screen">
      <div
        ref={sideBarRef}
        className={`fixed top-0 left-0 mt-16 bg-white h-screen transition-all duration-300 transform shadow-sm ${
          barOpen ? "w-1/6 " : "w-[60px]"
        }`}
        style={{ minWidth: barOpen ? "250px" : "60px" }}
      >
        <SideBarSelector
          onClick={barHandler}
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
          image={<RiCompassDiscoverLine />}
          className={
            selectedOption === "discoverPrograms" &&
            "bg-slate-100 border-solid border-r-[1px] border-slate-700"
          }
        />
      </div>
      <div className={`h-screen flex-grow pl-[60px]`}>
        {selectedOption === "myPrograms" && <MyPrograms />}
        {selectedOption === "discoverPrograms" && <DiscoverProgram />}
      </div>
    </div>
  );
};

export default SideBar;
