import { useState, useEffect } from "react";
import moment from "moment";
import TaskItem from "./TaskItem";

const Task = (props) => {
  const [day, setDay] = useState({
    day: moment(props.day),
    dayStr: `${moment(props.day).format("dddd")}, ${moment(props.day).format(
      "MMMM"
    )} ${moment(props.day).format("DD")}, ${moment(props.day).format("YYYY")}`,
  });

  const [tasks, setTasks] = useState({
    Name: "Workout 1",
    ID: 1,
    Exercises: [
      {
        Name: "Exercise 1",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
        TimeUnit: 2,
        Notes: "Notes for Exercise 1",
      },
      {
        Name: "Exercise 2",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
        TimeUnit: 2,
        Notes: "Notes for Exercise 2",
      },
      {
        Name: "Exercise 3",
        Description: "Description for Exercise 1",
        Weight: 50,
        Sets: 3,
        Reps: 10,
        Rest: 60,
        TimeUnit: 2,
        Notes: "Notes for Exercise 3",
      },
      {
        Name: "Exercise 4",
        Description: "Description for Exercise 2",
        Weight: 70,
        Sets: 4,
        Reps: 12,
        Rest: 90,
        TimeUnit: 2,
        Notes: "Notes for Exercise 4",
      },
    ],
  });

  useEffect(() => {
    setDay({
      day: moment(props.day),
      dayStr: `${moment(props.day).format("dddd")}, ${moment(props.day).format(
        "MMMM"
      )} ${moment(props.day).format("DD")}, ${moment(props.day).format(
        "YYYY"
      )}`,
    });
  }, [props.day]);

  const dayInc = () => {
    setDay((prevDay) => {
      const newDay = moment(prevDay.day).add(1, "day");
      return {
        day: newDay,
        dayStr: `${newDay.format("dddd")}, ${newDay.format(
          "MMMM"
        )} ${newDay.format("DD")}, ${newDay.format("YYYY")}`,
      };
    });
  };

  const dayDec = () => {
    setDay((prevDay) => {
      const newDay = moment(prevDay.day).subtract(1, "day");
      return {
        day: newDay,
        dayStr: `${newDay.format("dddd")}, ${newDay.format(
          "MMMM"
        )} ${newDay.format("DD")}, ${newDay.format("YYYY")}`,
      };
    });
  };

  return (
    <div className="bg-white mt-5 flex-grow rounded-md p-4">
      <div className="flex flex-row justify-between border-solid border-b-[1px] pb-2">
        <div className="font-thin">{day.dayStr}</div>
        <div className="flex flex-row pt-1">
          <div
            className="w-3 h-3 border-solid border-l-4 border-t-4 border-black opacity-[17%] -rotate-45 cursor-pointer hover:opacity-[30%]"
            onClick={dayDec}
          />
          <div
            className="w-3 h-3 border-solid border-l-4 border-t-4 border-black opacity-[17%] rotate-[135deg] cursor-pointer hover:opacity-[30%]"
            onClick={dayInc}
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[420px]">
        {Object.keys(tasks).length === 0 ? (
          <div>No workouts</div>
        ) : (
          tasks.Exercises.map((exercise) => {
            return <TaskItem task={exercise} />;
          })
        )}
      </div>
    </div>
  );
};

export default Task;
