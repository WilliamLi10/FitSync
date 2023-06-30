import { useNavigate } from "react-router-dom";

const CalendarWorkout = (props) => {
  const navigate = useNavigate();

  const logHandler = () => {
    navigate("/LogWorkout");
  };
  
  return (
    <div
      onClick={logHandler}
      className="cursor-pointer bg-slate-100 px-1 m-1 py-1 rounded transiton hover:bg-slate-200"
    >
      <h1 className="font-semibold">{props.workout.Name}</h1>
      {props.workout.Exercises.map((exercise) => {
        return <p className="font-thin text-sm">{exercise.Name}</p>;
      })}
    </div>
  );
};

export default CalendarWorkout;
