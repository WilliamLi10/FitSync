const Exercise = (props) => {
  return (
    <div className="min-w-[500px] mb-5">
      <div className="font-thin">{props.exercise.Name}</div>
      <div className="flex flex-row justify-between bg-white">
        <div className="flex-grow flex-col flex">
          <div className="bg-slate-200 text-center border-r-[1px] border-white">
            Sets
          </div>
          {Array.from({ length: props.exercise.Sets }, (_, index) => (
            <div
              className="text-center border-solid border-r-[1px] border-slate-200 py-1 border-b-[1px] border-l-[1px] flex-grow"
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="flex-grow flex-col flex">
          <div className="bg-slate-200 text-center border-r-[1px] border-white">
            Reps
          </div>
          {Array.from({ length: props.exercise.Sets }, (_, index) => (
            <div
              key={index}
              className="text-center border-solid border-r-[1px] border-slate-200 py-1 flex-grow border-b-[1px]"
            >
              <input
                placeholder={props.exercise.Reps}
                className="border-solid border-[1px] text-center w-9"
              />
            </div>
          ))}
        </div>
        <div className="flex-grow flex-col flex">
          <div className="bg-slate-200 text-center border-r-[1px] border-white">
            Weights
          </div>
          {Array.from({ length: props.exercise.Sets }, (_, index) => (
            <div
              key={index}
              className="text-center border-solid border-r-[1px] border-slate-200 py-1 flex-grow border-b-[1px]"
            >
              <input
                placeholder={props.exercise.Weight}
                className="border-solid border-[1px] text-center w-9"
              />
            </div>
          ))}
        </div>
        <div className="flex-grow flex flex-col">
          <div className="bg-slate-200 text-center border-r-[1px] border-white">
            Notes
          </div>
          <textarea className="w-full flex-grow border-b-[1px] border-t-0 border-l-0 border-r-[1px] border-slate-200" />
        </div>
        <div className="flex-grow flex flex-col">
          <div className="bg-slate-200 text-center">Description</div>
          <div className="px-2 border-solid border-b-[1px] border-r-[1px] flex-grow text-gray-500">
            {props.exercise.Description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
