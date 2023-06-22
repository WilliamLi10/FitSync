import { useState, useEffect, useRef } from "react";
import { TbLetterW } from "react-icons/tb";
import DropDownMenu from "./DropDownMenu";
import TopLink from "./NavLink";
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
      <nav className="w-screen h-16 flex justify-between gap-4 text-md pl-[1.2rem] pr-10">
        <div className="h-full flex">
          <Link to="/" className="self-center pr-4 ">
            <TbLetterW className="cursor-pointer h-5 w-5" />{" "}
          </Link>
          <TopLink link="/" name="Progress" />
          <TopLink link="/WorkoutCreation" name="Programs" />
        </div>
        <div
          className="flex items-center mt-1 h-1/2 cursor-pointer py-6"
          onClick={handleMenu}
          ref={menuRef}
        >
          <p className="cursor-pointer">{props.UserInfo.name}</p>
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
