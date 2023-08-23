import { AiOutlineCheck } from "react-icons/ai";

const ShareDropDown = (props) => {
  const itemCSS =
    "px-4 py-2 hover:bg-slate-100 flex flex-row items-center pr-10";

  return (
    <div className="flex flex-col absolute mt-36 bg-white shadow-lg">
      <div
        className={itemCSS}
        onClick={() => props.changeRole(props.name, "Editor")}
      >
        <AiOutlineCheck
          className={`${
            props.role === "Editor" ? "text-green-500" : "text-white"
          }`}
        />
        &#160;Editor
      </div>
      <div
        className={itemCSS}
        onClick={() => props.changeRole(props.name, "Viewer")}
      >
        <AiOutlineCheck
          className={`${
            props.role === "Viewer" ? "text-green-500" : "text-white"
          }`}
        />
        &#160;Viewer
      </div>
      <div className="border-solid border-t-[1px]">
        <div className={itemCSS}>Remove</div>
      </div>
    </div>
  );
};

export default ShareDropDown;
