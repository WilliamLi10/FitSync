import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import EditProgram from "./EditProgram";
import { useState } from "react";

const ProgramItem = (props) => {
  const navigate = useNavigate();
  const date = new Date(props.program.lastOpened);

  const [edit, setEdit] = useState(false);

  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const editHandler = (event) => {
    event.stopPropagation();
    setEdit(true);
  };

  return (
    <div
      className="flex flex-row text-sm font-thin border-solid border-b-[1px] py-2 cursor-pointer transition-all duration-300 hover:bg-gray-50"
      onClick={() => {
        navigate(`/programs/${props.program._id}`);
      }}
    >
      <div className="w-[60%] overflow-hidden overflow-ellipsis whitespace-nowrap pr-3">
        {props.program.name}
      </div>
      <div className="w-[20%] overflow-hidden overflow-ellipsis whitespace-nowrap pr-3">
        {props.program.ownerName}
      </div>
      <div className="w-[20%] overflow-hidden overflow-ellipsis whitespace-nowrap pr-3">
        {`${month} ${day}, ${year}`}
      </div>
      <div onClick={editHandler}>
        <SlOptionsVertical className="transition-all duration-150 hover:bg-gray-300 rounded-full py-1 h-5 w-5" />
        {edit && <EditProgram modalHandler={setEdit} />}
      </div>
    </div>
  );
};

export default ProgramItem;
