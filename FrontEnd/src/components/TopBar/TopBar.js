import { useState, useEffect, useRef, useContext } from "react";
import { TbLetterW } from "react-icons/tb";
import TopLink from "./TopLink";
import AccountOptions from "./AccountOptions";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { checkAccess, getAccess } from "../../util/auth";

const TopBar = (props) => {
  const ctx = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleMenu = () => {
    setShowMenu((prevShowMenu) => {
      return !prevShowMenu;
    });
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
          {checkAccess() ? (
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
        {checkAccess() ? (
          <div className="w-52">
            <div
              className={`flex items-center justify-end h-full self-center ${
                  showMenu && "border-solid border-b-2 border-slate-700"}`}
              onClick={handleMenu}
              ref={menuRef}
            >
              <p
                className={`py-4 px-4 cursor-pointer hover:bg-slate-50 
                `}
              >
                {getAccess().username}
              </p>
            </div>
            {showMenu && <AccountOptions />}
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
