import { useState } from "react";
import WorkoutContainer from "./WorkoutContainer";
import Workout from "./Workout";
import NoActiveWorkoutOverlay from "./NoActiveWorkoutOverlay";
const WorkoutDisplay = (props) => {
  const [curWeek, setCurWeek] = useState({
    "Week 1": [
      {
        id: 1,
        name: "Day 1",
        date: "4/20/2023",
        time: "4-6pm",
        warmup: [
          {
            Exercise: "Light Cardio",
            Duration: "5-10",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Foam-Rolling",
            Duration: "2-3",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Squat Pyramid Sets",
            Duration: "3 Sets",
            Unit: "",
            Desc: "",
          },
        ],
        mainExercises: [
          {
            Exercise: "Competition Squat",
            Sets: 3,
            Reps: 3,
            Intensity: "80%",
            Weight: 315,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
            Type: "Constant",
          },
          {
            Exercise: "Competition Squat",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 270,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 4,
            Reps: 3,
            Intensity: "80%",
            Weight: 245,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 205,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
        ],
        accessories: [
          {
            Exercise: "SLDL",
            Sets: 4,
            Reps: 9,
            Weight: 225,
            Notes: "Perform at 8RPE with 1.0.1 tempo",
            Rest: 90,
            Unit: "sec",
          },
          {
            Exercise: "Pull-ups",
            Sets: 2,
            Weight: null,
            Reps: null,
            Notes: "Perform AMRAP sets",
            Rest: 60,
            Unit: "sec",
          },
        ],
      },
      {
        id: 2,
        name: "Day 2",
        date: "4/21/2023",
        time: "4-6pm",
        warmup: [
          {
            Exercise: "Light Cardio",
            Duration: "5-10",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Foam-Rolling",
            Duration: "2-3",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Squat Pyramid Sets",
            Duration: "3 Sets",
            Unit: "",
            Desc: "",
          },
        ],
        mainExercises: [
          {
            Exercise: "Competition Squat",
            Sets: 3,
            Reps: 3,
            Intensity: "80%",
            Weight: 315,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
            Type: "Constant",
          },
          {
            Exercise: "Competition Squat",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 270,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 4,
            Reps: 3,
            Intensity: "80%",
            Weight: 245,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 205,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
        ],
        accessories: [
          {
            Exercise: "SLDL",
            Sets: 4,
            Reps: 9,
            Weight: 225,
            Notes: "Perform at 8RPE with 1.0.1 tempo",
            Rest: 90,
            Unit: "sec",
          },
          {
            Exercise: "Pull-ups",
            Sets: 2,
            Weight: null,
            Reps: null,
            Notes: "Perform AMRAP sets",
            Rest: 60,
            Unit: "sec",
          },
        ],
      },
      {
        id: 3,
        name: "Day 3",
        date: "4/23/2023",
        time: "4-6pm",
        warmup: [
          {
            Exercise: "Light Cardio",
            Duration: "5-10",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Foam-Rolling",
            Duration: "2-3",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Squat Pyramid Sets",
            Duration: "3 Sets",
            Unit: "",
            Desc: "",
          },
        ],
        mainExercises: [
          {
            Exercise: "Competition Squat",
            Sets: 3,
            Reps: 3,
            Intensity: "80%",
            Weight: 315,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
            Type: "Constant",
          },
          {
            Exercise: "Competition Squat",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 270,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 4,
            Reps: 3,
            Intensity: "80%",
            Weight: 245,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 205,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
        ],
        accessories: [
          {
            Exercise: "SLDL",
            Sets: 4,
            Reps: 9,
            Weight: 225,
            Notes: "Perform at 8RPE with 1.0.1 tempo",
            Rest: 90,
            Unit: "sec",
          },
          {
            Exercise: "Pull-ups",
            Sets: 2,
            Weight: null,
            Reps: null,
            Notes: "Perform AMRAP sets",
            Rest: 60,
            Unit: "sec",
          },
        ],
      },
      {
        id: 4,
        name: "Day 4",
        date: "4/24/2023",
        time: "4-6pm",
        warmup: [
          {
            Exercise: "Light Cardio",
            Duration: "5-10",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Foam-Rolling",
            Duration: "2-3",
            Unit: "min",
            Desc: "",
          },
          {
            Exercise: "Squat Pyramid Sets",
            Duration: "3 Sets",
            Unit: "",
            Desc: "",
          },
        ],
        mainExercises: [
          {
            Exercise: "Competition Squat",
            Sets: 3,
            Reps: 3,
            Intensity: "80%",
            Weight: 315,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
            Type: "Constant",
          },
          {
            Exercise: "Competition Squat",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 270,
            Tempo: "1.0.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 4,
            Reps: 3,
            Intensity: "80%",
            Weight: 245,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
          {
            Exercise: "Competition Pause Bench",
            Sets: 2,
            Reps: 5,
            Intensity: "68%",
            Weight: 205,
            Tempo: "1.1.1",
            Rest: 180,
            Unit: "sec",
          },
        ],
        accessories: [
          {
            Exercise: "SLDL",
            Sets: 4,
            Reps: 9,
            Weight: 225,
            Notes: "Perform at 8RPE with 1.0.1 tempo",
            Rest: 90,
            Unit: "sec",
          },
          {
            Exercise: "Pull-ups",
            Sets: 2,
            Weight: null,
            Reps: null,
            Notes: "Perform AMRAP sets",
            Rest: 60,
            Unit: "sec",
          },
        ],
      },
    ],
  });
  const [workoutOrder, setWorkoutOrder] = useState([
    { dayOfWeek: "Sun", date: "4/20/2023"},
    { dayOfWeek: "Mon", date: "4/21/2023"},
    { dayOfWeek: "Tue", date: "4/22/2023"},
    { dayOfWeek: "Wed", date: "4/23/2023" },
    { dayOfWeek: "Thu", date: "4/24/2023" },
    { dayOfWeek: "Fri", date: "4/25/2023" },
    { dayOfWeek: "Sat", date: "4/26/2023" },
  ]);
  const updateWorkoutBoard =  (newDate, newWorkoutid) => {
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

    setWorkoutOrder(newOrder);
  };

  const workouts = {};
  curWeek["Week 1"].forEach(function(curWorkout) {
    workouts[curWorkout.id] = <Workout id = {curWorkout.id} workout = {curWorkout} />;

  });

  

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
      {!curWeek ? <NoActiveWorkoutOverlay /> : ""}
    </div>
  );
};

export default WorkoutDisplay;
