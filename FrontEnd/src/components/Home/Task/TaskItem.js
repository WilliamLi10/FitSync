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
        className="flex flex-row items-center pt-2 border-solid border-b-[1px] pb-2 cursor-pointer"
      >
        <div className="w-2 h-2 rounded-full bg-slate-700" />
        <div className="pl-2">{props.task.Name}</div>
      </div>
      {open && <div className="ml-4 text-gray-500">{props.task.Description}</div>}
    </div>
  );
};

export default TaskItem;
