const CalendarWorkout = (props) => {
  return (
    <div
      onClick={props.open}
      className="cursor-pointer bg-slate-100 border-solid border-l-4 border-slate-700 px-1 m-1 py-1 rounded transiton hover:bg-slate-200"
    >
      <h1 className="font-semibold">{props.workout.Name}</h1>
      {props.workout.Exercises.map((exercise) => {
        return <p className="font-thin text-sm">{exercise.Name}</p>;
      })}
    </div>
  );
};

export default CalendarWorkout;
