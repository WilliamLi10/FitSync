import { useState } from "react";

const TaskItem = (props) => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div
        onClick={openHandler}
        className="flex flex-row items-center pt-2 border-solid border-b-[1px] pb-2 cursor-pointer hover:bg-slate-50"
      >
        <div className="w-2 h-2 rounded-full bg-slate-700" />
        <div className="pl-2 font-thin text-sm">{props.item.name}</div>
      </div>
      {open && (
        <div className="ml-4 pt-1 text-sm">
          <div className="text-gray-500">{props.item.description}</div>
          <span className="font-semibold">Sets: </span>
          {props.item.sets} <span className="font-semibold">Reps: </span>
          {props.item.reps}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
