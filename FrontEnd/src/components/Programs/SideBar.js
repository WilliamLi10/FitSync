import { useState, useRef, useEffect } from "react";
import { RiFileList2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const barRef = useRef(null);

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
    <nav
      ref={barRef}
      className={`bg-white h-screen transition-all duration-300 transform shadow-sm sticky ${
        barOpen ? "w-1/6 min-w-[250px]" : "w-[60px] min-w-[60px]"
      }`}
    >
      <ul>
        <li>
          <div
            className="flex items-center py-10 px-5 gap-4 cursor-pointer h-[6rem] hover:bg-slate-50"
            onClick={barHandler}
          >
            <div className="h-5 w-5">
              <FaBars />
            </div>
          </div>
        </li>
        <li>
          <NavLink
            to="myprograms"
            className={({ isActive }) =>
              `flex items-center py-10 px-5 gap-4 cursor-pointer h-[6rem] ${
                isActive
                  ? "bg-slate-100 border-solid border-r-[1px] border-slate-700"
                  : "hover:bg-slate-50"
              }`
            }
          >
            <div className="h-5 w-5">
              <RiFileList2Line />
            </div>
            <h1 className="text-md">{barOpen && "My Programs"}</h1>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
