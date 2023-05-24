import { useState, useEffect } from "react";
import WorkoutContainer from "./WorkoutContainer";
import Workout from "./Workout";
import NoActiveWorkoutOverlay from "./NoActiveWorkoutOverlay";
const WorkoutDisplay = (props) => {
  const [curWeek, setCurWeek] = useState();

  const [workoutOrder, setWorkoutOrder] = useState([
    { dayOfWeek: "Sun", date: "4/20/2023" },
    { dayOfWeek: "Mon", date: "4/21/2023" },
    { dayOfWeek: "Tue", date: "4/22/2023" },
    { dayOfWeek: "Wed", date: "4/23/2023" },
    { dayOfWeek: "Thu", date: "4/24/2023" },
    { dayOfWeek: "Fri", date: "4/25/2023" },
    { dayOfWeek: "Sat", date: "4/26/2023" },
  ]);

  const workouts = {};

  useEffect(() => {
    if (!curWeek) {
      return;
    }
    curWeek.forEach(function (curWorkout) {
      workouts[curWorkout.id] = (
        <Workout id={curWorkout.id} workout={curWorkout} />
      );
    });
    const newOrder = [];
    let i = 0;
    workoutOrder.forEach(function (day) {

      if (i < curWeek.length && day.date === curWeek[i].date) {
        newOrder.push({ ...day, workoutid: curWeek[i].id });
        i += 1;
      } else {
        newOrder.push({ ...day });
      }
    });

    setWorkoutOrder(newOrder);
  }, []);

  return (
    <div className={props.className}>
      {workoutOrder.map((day) => (
        <WorkoutContainer
          dayOfWeek={day.dayOfWeek}
          date={day.date}
          workout={day.workoutid === "8" ? "" : workouts[day.workoutid]}
          workoutid={day.workoutid === "8" ? "" : day.workoutid}
        />
      ))}
      {curWeek ? "" : <NoActiveWorkoutOverlay />}
    </div>
  );
};

export default WorkoutDisplay;
