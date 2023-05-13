import { useState } from "react";
import WorkoutContainer from "./WorkoutContainer";
import Workout from "./Workout";
import { useDrop } from "react-dnd";
function stringDifferences(str1, str2) {
  let differences = [];

  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      differences.push({ index: i, char1: str1[i], char2: str2[i] });
    }
  }

  // Check for extra characters in the longer string
  if (str1.length !== str2.length) {
    const longerString = str1.length > str2.length ? str1 : str2;
    for (let i = minLength; i < longerString.length; i++) {
      differences.push({ index: i, char1: str1[i], char2: str2[i] });
    }
  }

  return differences;
}
const WorkoutDisplay = (props) => {
  const [workoutOrder, setWorkoutOrder] = useState([
    { dayOfWeek: "Sun", date: "10", workoutid: "2" },
    { dayOfWeek: "Mon", date: "11", workoutid: "8" },
    { dayOfWeek: "Tue", date: "12", workoutid: "8" },
    { dayOfWeek: "Wed", date: "13", workoutid: "1" },
    { dayOfWeek: "Thu", date: "14", workoutid: "4" },
    { dayOfWeek: "Fri", date: "15", workoutid: "3" },
    { dayOfWeek: "Sat", date: "16", workoutid: "8" },
  ]);
  const updateWorkoutBoard = async (newDate, newWorkoutid) => {
    console.log(workoutOrder);
    console.log(newDate, newWorkoutid);
    const newOrder = workoutOrder.map((day) => {
      if (day.dayOfWeek == newDate) {
        console.log("New");
        return { ...day, workoutid: newWorkoutid };
      }
      if (day.workoutid === newWorkoutid) {
        console.log(
          "returning:",
          newDate,
          day.dayOfWeek,
          newWorkoutid,
          day.workoutid
        );
        return { ...day, workoutid: "8" };
      }

      return { ...day };
    });

    await setWorkoutOrder(newOrder);
  };

  const workouts = {
    8: <Workout time="" name="Rest" id="8" />,
    1: <Workout time="9-11AM" name="Day1" id="1" />,
    2: <Workout time="Test" name="Day2" id="2" />,
    3: <Workout time="Test" name="Day3" id="3" />,
    4: <Workout time="Test" name="Day4" id="4" />,
  };
  return (
    <div className={props.className}>
      {workoutOrder.map((day) => (
        <WorkoutContainer
          dayOfWeek={day.dayOfWeek}
          date={day.date}
          workout={day.workoutid === "8" ? "" : workouts[day.workoutid]}
          workoutid={day.workoutid === "8" ? "" : day.workoutid}
          updateWorkoutBoard={updateWorkoutBoard}
        />
      ))}
    </div>
  );
};

export default WorkoutDisplay;
