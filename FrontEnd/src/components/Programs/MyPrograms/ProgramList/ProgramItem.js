import { useNavigate } from "react-router-dom";

const ProgramItem = (props) => {
  const navigate = useNavigate();
  const date = new Date(props.program.lastOpened);

  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div
      className="flex flex-row text-sm font-thin border-solid border-b-[1px] py-2 cursor-pointer transition-all duration-300 hover:bg-gray-50"
      onClick={() => {
        navigate(`/programs/myprograms/${props.program._id}`);
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
    </div>
  );
};

export default ProgramItem;
