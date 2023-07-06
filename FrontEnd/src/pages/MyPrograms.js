import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import ProgramList from "../components/Programs/MyPrograms/ProgramList";
import ProgramView from "../components/Programs/MyPrograms/ProgramView";

const MyPrograms = () => {
  const [view, setView] = useState(false);

  const viewHandler = () => {
    setView((prevView) => !prevView);
  };

  const programs = [
    {
      _id: "648652e80bdb9320b08881cc",
      Name: "Workout Plan 1",
      Owner: "648652e80bdb9320b08881cd",
      Editors: [{ $oid: "648652e80bdb9320b08881c9" }],
      Viewers: [],
      Workouts: [
        {
          Name: "Workout 1",
          ID: { $numberInt: "1" },
          Exercises: [
            {
              Name: "Exercise 1",
              Description: "Description for Exercise 1",
              Weight: { $numberInt: "50" },
              Sets: { $numberInt: "3" },
              Reps: { $numberInt: "10" },
              Rest: { $numberInt: "60" },
              TimeUnit: { $numberInt: "2" },
              Notes: "Notes for Exercise 1",
            },
            {
              Name: "Exercise 2",
              Description: "Description for Exercise 2",
              Weight: { $numberInt: "70" },
              Sets: { $numberInt: "4" },
              Reps: { $numberInt: "12" },
              Rest: { $numberInt: "90" },
              TimeUnit: { $numberInt: "2" },
              Notes: "Notes for Exercise 2",
            },
          ],
        },
        {
          Name: "Workout 2",
          ID: { $numberInt: "2" },
          Exercises: [
            {
              Name: "Exercise 3",
              Description: "Description for Exercise 3",
              Weight: { $numberInt: "60" },
              Sets: { $numberInt: "3" },
              Reps: { $numberInt: "10" },
              Rest: { $numberInt: "60" },
              TimeUnit: { $numberInt: "2" },
              Notes: "Notes for Exercise 3",
            },
            {
              Name: "Exercise 4",
              Description: "Description for Exercise 4",
              Weight: { $numberInt: "80" },
              Sets: { $numberInt: "5" },
              Reps: { $numberInt: "15" },
              Rest: { $numberInt: "120" },
              TimeUnit: { $numberInt: "2" },
              Notes: "Notes for Exercise 4",
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
      Frequency: { $numberInt: "2" },
      Workouts: [
        {
          Name: "Workout 1",
          ID: { $numberInt: "1" },
          Exercises: [
            {
              Name: "Exercise 1",
              Description: "First exercise",
              Weight: { $numberInt: "20" },
              Sets: { $numberInt: "3" },
              Reps: { $numberInt: "10" },
              Rest: { $numberInt: "60" },
              TimeUnit: "sec",
              Notes: "Warmup",
            },
            {
              Name: "Exercise 2",
              Description: "Second exercise",
              Weight: { $numberInt: "30" },
              Sets: { $numberInt: "3" },
              Reps: { $numberInt: "10" },
              Rest: { $numberInt: "60" },
              TimeUnit: "sec",
              Notes: "Main",
            },
          ],
        },
        {
          Name: "Workout 2",
          ID: { $numberInt: "2" },
          Exercises: [
            {
              Name: "Exercise 3",
              Description: "Third exercise",
              Weight: { $numberInt: "50" },
              Sets: { $numberInt: "3" },
              Reps: { $numberInt: "10" },
              Rest: { $numberInt: "60" },
              TimeUnit: "sec",
              Notes: "Cool down",
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
          <ProgramList programs={programs} type="Favorite" />
          <ProgramList programs={programs} type="Recent" />
        </div>
      )}
    </div>
  );
};

export default MyPrograms;
