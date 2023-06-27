const Exercise = (props) => {
  return (
    <div className="min-w-[500px]">
      <div className="font-thin">{props.exercise.Name}</div>
      <div className="flex flex-row bg-white justify-evenly shadow-sm mb-3">
        <div className="flex-grow">
          <div className="border-solid border-r-[1px] border-white text-center bg-slate-200">
            Set
          </div>
          {Array.from({ length: props.exercise.Sets }, (_, index) => (
            <div className="text-center border-solid border-r-[1px] border-slate-200">
              {index + 1}
            </div>
          ))}
        </div>
        <div className="flex-grow">
          <div className="border-solid border-r-[1px] border-white text-center bg-slate-200">
            Rep
          </div>
          {Array.from({ length: props.exercise.Sets }, (_, index) => (
            <div className="text-center border-solid border-r-[1px] border-slate-200">
              {props.exercise.Reps}
            </div>
          ))}
        </div>
        <div className="flex-grow">
          <div className="border-solid border-r-[1px] border-white text-center bg-slate-200">
            Weight
          </div>
          {Array.from({ length: props.exercise.Sets }, (_, index) => (
            <div className="text-center border-solid border-r-[1px] border-slate-200">
              {props.exercise.Weight}
            </div>
          ))}
        </div>
        <div className="flex-grow">
          <div className="border-solid text-center bg-slate-200">
            Description
          </div>
          <div className="pl-2">{props.exercise.Description}</div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
