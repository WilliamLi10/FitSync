import { useContext } from "react";
import moment from "moment";
import TaskItem from "./TaskItem";
import WorkoutContext from "../../../context/workout-context";

const Task = () => {
  const ctx = useContext(WorkoutContext);

  return (
    <div className="bg-white mt-5 flex-grow rounded-md p-4">
      <div className="flex flex-row justify-between border-solid border-b-[1px] pb-2">
        <div className="font-thin">{`${moment(ctx.day).format(
          "dddd"
        )}, ${moment(ctx.day).format("MMMM")} ${moment(ctx.day).format(
          "DD"
        )}, ${moment(ctx.day).format("YYYY")}`}</div>
        <div className="flex flex-row pt-1">
          <div
            className="w-3 h-3 border-solid border-l-4 border-t-4 border-black opacity-[17%] -rotate-45 cursor-pointer hover:opacity-[30%]"
            onClick={ctx.dayDec}
          />
          <div
            className="w-3 h-3 border-solid border-l-4 border-t-4 border-black opacity-[17%] rotate-[135deg] cursor-pointer hover:opacity-[30%]"
            onClick={ctx.dayInc}
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[420px]">
        {!ctx.tasks || ctx.tasks.length === 0 ? (
          <div>No workouts</div>
        ) : (
          ctx.tasks.map((task) => {
            return task.workoutData.map((item) => {
              return <TaskItem item={item} />;
            });
          })
        )}
      </div>
    </div>
  );
};

export default Task;
