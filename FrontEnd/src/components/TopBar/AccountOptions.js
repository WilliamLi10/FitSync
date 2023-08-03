import { BiUser } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AccountOptions = () => {
  const navigate = useNavigate();

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
          return response.json().then((data) => {
            navigate("/error", {
              state: { error: data.error, status: response.status },
            });
            throw "";
          });
        }
        return response.json();
      })
      .then((data) => {
        Cookies.remove("jwt");
        window.location.reload();
      })
      .catch((error) => {
        if (`${error}` !== "") {
          navigate("/error", { state: { error: `${error}`, status: 500 } });
        }
      });
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
