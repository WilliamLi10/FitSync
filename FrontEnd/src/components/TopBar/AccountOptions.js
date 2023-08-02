import { BiUser } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import Cookies from "js-cookie";

const AccountOptions = () => {
  const optionCSS =
    "transition-all duration-150 hover:bg-slate-200 px-2 py-1 cursor-pointer flex flex-row items-center";

  const logoutHandler = () => {
    fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error expiring jwt.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        Cookies.remove("jwt");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
    //Cookies.remove("jwt");
  };

  return (
    <div className="relative flex flex-col bg-white shadow-lg">
      <div className={optionCSS}>
        <BiUser />
        &nbsp; Profile
      </div>
      <div className={optionCSS}>
        <BsGear />
        &nbsp; Settings
      </div>
      <div
        className={`${optionCSS} border-solid border-t-[2px]`}
        onClick={logoutHandler}
      >
        <MdOutlineLogout />
        &nbsp; Logout
      </div>
    </div>
  );
};

export default AccountOptions;
