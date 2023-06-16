import { useState } from "react";
import moment from "moment";
import SelectedWorkout from "./SelectedWorkout";

const WorkoutContainer = (props) => {
  const isToday = moment().isSame(moment(props.date), "day");

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const workout = {
    id: 4,
    name: "Upper 1",
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
  };

  return (
    <div
      className={`h-screen w-[14.28%] my-2 border-gray border-solid min-w-[100px] ${
        props.dayOfWeek != "Saturday" ? "border-r-[1px]" : ""
      }`}
    >
      <div className="h-[70px] text-center border-b-[1px] border-gray border-solid">
        <div
          className={`text-1xl font-semibold  ${
            isToday ? "text-slate-700" : "text-gray-500"
          }`}
        >
          {props.dayOfWeek.slice(0, 3).toUpperCase()}
        </div>
        <div
          className={`text-2xl ${
            isToday ? "text-white bg-slate-700 rounded-full" : "text-gray-500"
          }`}
        >
          {parseInt(props.day)}
        </div>
      </div>
      <div className="h-[90%]" onClick={openModal}>
        {modal && <SelectedWorkout close={closeModal} />}
        {modal && (
          <div className="fixed top-[0] left-[0] w-[100%] h-[100%] bg-black opacity-[0.5] z-[1]" />
        )}
        {workout && workout.name}
      </div>
    </div>
  );
};

export default WorkoutContainer;
