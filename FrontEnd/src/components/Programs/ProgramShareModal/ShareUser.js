import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ShareDropDown from "./ShareDropDown";

const ShareUser = (props) => {
  const [role, setRole] = useState(
    props.type.replace(/\b\w/g, (char) => char.toUpperCase())
  );
  const [drop, setDrop] = useState(false);

  return (
    <div className="flex flex-row text-sm justify-between transition-all duration-150 hover:bg-slate-100 py-2 px-3">
      <div>{props.name}</div>
      {props.type !== "owner" &&
      (props.role === "owner" ||
        (props.role === "editor" && props.editPermission)) ? (
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => {
            setDrop((prevDrop) => !prevDrop);
          }}
        >
          <div className="pr-1">{role}</div>
          <AiFillCaretDown className="w-3" />
          {drop && (
            <ShareDropDown
              role={role}
              changeRole={props.changeRole}
              name={props.name}
            />
          )}
        </div>
      ) : (
        <div>{role}</div>
      )}
    </div>
  );
};

export default ShareUser;
