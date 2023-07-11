import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import ProgramList from "../components/Programs/MyPrograms/ProgramList";
import ProgramView from "../components/Programs/MyPrograms/ProgramView";

const MyPrograms = () => {
  const [view, setView] = useState(false);

  const viewHandler = () => {
    console.log("view")
    setView((prevView) => !prevView);
  };

  const programs = [
    {
      _id: "648652e80bdb9320b08881ca",
      Name: "Morning Routine",
      Owner: "648652e80bdb9320b08881c9",
      Editors: [{ $oid: "648652e80bdb9320b08881cd" }],
      Viewers: [],
      Frequency: "2",
      Workouts: [
        {
          Name: "Workout 1",
          ID: "1",
          Exercises: [
            {
              Name: "Exercise 1",
              Description: "First exercise",
              Weight: "20",
              Sets: "3",
              Reps: "10",
              Rest: "60",
            },
            {
              Name: "Exercise 2",
              Description: "Second exercise",
              Weight: "30",
              Sets: "3",
              Reps: "10",
              Rest: "60",
            },
          ],
        },
        {
          Name: "Workout 2",
          ID: "2",
          Exercises: [
            {
              Name: "Exercise 3",
              Description: "Third exercise",
              Weight: "50",
              Sets: "3",
              Reps: "10",
              Rest: "60",
            },
          ],
        },
      ],
    },
    {
      _id: "648652e80bdb9320b08881ca",
      Name: "Morning Routine",
      Owner: "648652e80bdb9320b08881c9",
      Editors: [{ $oid: "648652e80bdb9320b08881cd" }],
      Viewers: [],
      Frequency: "2",
      Workouts: [
        {
          Name: "Workout 1",
          ID: "1",
          Exercises: [
            {
              Name: "Exercise 1",
              Description: "First exercise",
              Weight: "20",
              Sets: "3",
              Reps: "10",
              Rest: "60",
            },
            {
              Name: "Exercise 2",
              Description: "Second exercise",
              Weight: "30",
              Sets: "3",
              Reps: "10",
              Rest: "60",
            },
          ],
        },
        {
          Name: "Workout 2",
          ID: "2",
          Exercises: [
            {
              Name: "Exercise 3",
              Description: "Third exercise",
              Weight: "50",
              Sets: "3",
              Reps: "10",
              Rest: "60",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 w-full h-full px-5 py-5">
      {view ? (
        <ProgramView close={viewHandler} />
      ) : (
        <div>
          <button
            className="flex flex-row items-center text-sm font-thin bg-white rounded-md shadow-sm px-4 py-2 mb-5 border-solid border-[1px] transition-all duration-300 hover:bg-gray-50"
            onClick={viewHandler}
          >
            <RiAddLine /> &#160;Create New Program
          </button>
          <ProgramList programs={programs} type="Favorite" view={viewHandler} />
          <ProgramList programs={programs} type="Recent" view={viewHandler} />
        </div>
      )}
    </div>
  );
};

export default MyPrograms;
