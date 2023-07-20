import { useState, useRef, useEffect } from "react";
import { RiCompassDiscoverLine, RiFileList2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import SideBarSelector from "./SideBarSelector";
import MyPrograms from "../../../pages/LoggedIn/MyPrograms";
import DiscoverProgram from "../../../pages/LoggedIn/DiscoverProgram";

const SideBar = () => {
  const barRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState("myPrograms");

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setBarOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const barHandler = () => {
    setBarOpen((prevBarOpen) => !prevBarOpen);
  };

  return (
    <div className="flex flex-row h-screen mt-16 w-screen">
      <div
        ref={barRef}
        className={`fixed top-0 left-0 mt-16 bg-white h-screen transition-all duration-300 transform shadow-sm ${
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
