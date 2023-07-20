import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import {CgProfile} from "react-icons/cg"
const DropDownMenu = (props) => {
  return (
    <div className= {props.className} style = {props.style}>
        <div className = "bg-white w-5 h-5 absolute top-[-0.69rem] right-[1.2rem] border-t-2 border-r-2 border-black border-solidtransform -rotate-45"></div>
      <ul>
      <div className="flex items-center gap-4 hover:bg-gray-100 hover:rounded-md px-4 py-2"> 
      <CgProfile />
      <li>Profile</li>
      </div>
        <div className="flex items-center gap-4 hover:bg-gray-100 hover:rounded-md px-4 py-2">
          <IoSettingsOutline />
          <li>Settings</li>
        </div>
        <div className="flex items-center gap-4 hover:bg-gray-100 hover:rounded-md px-4 py-2">
          <FiLogOut />
          <li>Log Out</li>
        </div>
      </ul>
    </div>
  );
};

export default DropDownMenu;
