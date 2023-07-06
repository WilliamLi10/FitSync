const Workout = (props) => {
  const tableCSS = "flex-grow flex-col flex font-thin";
  const titleCSS = "bg-slate-200 text-center";
  const itemCSS =
    "text-center border-solid border-r-[1px] border-slate-200 py-1 border-b-[1px] flex-grow";
  const inputCSS = "border-solid border-[1px] text-center w-9";

  return (
    <div className="min-w-[500px] mb-5">
      <div className="font-thin cursor-pointer ">Untitled</div>
      <div className="flex flex-row justify-between bg-white">
        <div className={tableCSS}>
          <div className={`${titleCSS} border-r-[1px] border-white`}>Sets</div>
          {Array.from({ length: 5 }, (_, index) => (
            <div className={`${itemCSS} border-l-[1px]`} key={index}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className={tableCSS}>
          <div className={`${titleCSS} border-r-[1px] border-white`}>Reps</div>
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={itemCSS}>
              <input className={inputCSS} />
            </div>
          ))}
        </div>
        <div className={tableCSS}>
          <div className={`${titleCSS} border-r-[1px] border-white`}>
            Weights
          </div>
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={itemCSS}>
              <input className={inputCSS} />
            </div>
          ))}
        </div>
        <div className={tableCSS}>
          <div className={`${titleCSS} border-r-[1px] border-white`}>
            Description
          </div>
          <textarea
            className="w-full flex-grow border-b-[1px] border-t-0 border-l-0 border-r-[1px] border-slate-200 focus:ring-slate-300 focus:border-slate-200"
            placeholder="optional"
          />
        </div>
      </div>
    </div>
  );
};

export default Workout;
