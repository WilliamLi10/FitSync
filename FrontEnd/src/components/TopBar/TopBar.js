import { useState, useEffect, useRef, useContext } from "react";
import { TbLetterW } from "react-icons/tb";
import DropDownMenu from "./DropDownMenu";
import TopLink from "./TopLink";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const TopBar = (props) => {
  const ctx = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(ctx.isLoggedIn);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleMenu = () => {
    let oldState = showMenu;
    setShowMenu(!oldState);
  };

  useEffect(() => {
    setIsLoggedIn(ctx.isLoggedIn);
  }, [ctx.isLoggedIn]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 bg-white w-screen h-16 flex justify-between gap-4 text-md pl-[1.2rem] pr-10 shadow-sm z-8">
        <div className="h-full flex">
          <Link to="/" className="self-center pr-4 ">
            <TbLetterW className="cursor-pointer h-5 w-5" />{" "}
          </Link>
          {isLoggedIn ? (
            <>
              <TopLink link="/" name="Dashboard" />
              <TopLink link="/LogWorkout" name="Log Workout" />
              <TopLink link="/Progress" name="Progress" />
              <TopLink link="/Programs" name="Programs" />
            </>
          ) : (
            <>
              <TopLink link="/" name="About" />
              <TopLink link="/Product" name="Product" />
              <TopLink link="/Contact" name="Contact" />
            </>
          )}
        </div>
        {isLoggedIn ? (
          <div
            className="flex items-center h-full self-center py-4 px-4 cursor-pointer hover:bg-slate-50"
            onClick={handleMenu}
            ref={menuRef}
          >
            <p>{props.UserInfo.name}</p>
            <DropDownMenu
              className={` bg-white z-50 absolute top-14 right-[2.9rem] w-30 h-30 px-0 py-4
     border-black border-solid border-2 rounded-lg transform transition-transform duration-[250ms] ease-in-out ${
       showMenu ? "scale-100" : "scale-0"
     }`}
              style={{ transformOrigin: "top" }}
            />
          </div>
        ) : (
          <div
            className="flex items-center h-full self-center py-4 px-4 cursor-pointer hover:bg-slate-50"
            onClick={() => {
              ctx.setLoginModal(true);
            }}
          >
            <p>Log In</p>
          </div>
        )}
      </nav>
    </>
  );
};

export default TopBar;
