import { BiUser } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

const AccountOptions = () => {
  const optionCSS =
    "transition-all duration-150 hover:bg-slate-200 px-2 py-1 cursor-pointer flex flex-row items-center";

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
      <div className={`${optionCSS} border-solid border-t-[2px]`}>
        <MdOutlineLogout />
        &nbsp; Logout
      </div>
    </div>
  );
};

export default AccountOptions;
