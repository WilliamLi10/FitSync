import { useState, useEffect, useRef } from "react";
import { TbLetterW } from "react-icons/tb";
import DropDownMenu from "./DropDownMenu";
import { Link } from "react-router-dom";

const TopBar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const handleMenu = () => {
    let oldState = showMenu;
    setShowMenu(!oldState);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);
  return (
    <>
      <nav
        className="w-screen h-16 flex justify-between gap-4 border-b-2 border-black border-solid text-2xl
        pl-10 pr-10 mb-0"
      >
        <div className="h-1/2 mt-3 flex items-center gap-8">
          <Link to = "/" ><TbLetterW className="cursor-pointer w-8 h-8" /> </Link>
          <a className=" cursor-pointer ml-2 hover:border-solid hover:border-b-2 hover:border-black">
            Progress
          </a>
          <Link to="/WorkoutCreation">
            <a className="cursor-pointer ml-4 mr-4 hover:border-solid hover:border-b-2 hover:border-black">
              Programs
            </a>
          </Link>
        </div>
        <div
          className="flex items-center  mt-1 h-1/2 cursor-pointer py-6"
          onClick={handleMenu}
          ref={menuRef}
        >
          <p className="cursor-pointer hover:border-solid hover:border-b-2 hover:border-black">
            {props.UserInfo.name}
          </p>
          <DropDownMenu
            className={` bg-white z-50 absolute top-14 right-[2.9rem] w-30 h-30 px-0 py-4
     border-black border-solid border-2 rounded-lg transform transition-transform duration-[250ms] ease-in-out ${
       showMenu ? "scale-100" : "scale-0"
     }`}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </nav>
    </>
  );
};

export default TopBar;
