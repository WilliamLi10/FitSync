import { useState } from "react";

const Exercise = (props) => {
  const [open, setOpen] = useState(true);

  const openHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const tableCSS = "flex-grow flex-col flex font-thin";
  const titleCSS = "bg-slate-200 text-center";
  const itemCSS =
    "text-center border-solid border-r-[1px] border-slate-200 py-1 border-b-[1px] flex-grow";
  const inputCSS = "border-solid border-[1px] text-center w-9";

  return (
    <div className="min-w-[500px] mb-5">
      <div
        onClick={openHandler}
        className={`font-thin cursor-pointer ${
          !open && "border-solid border-b-2"
        }`}
      >
        {props.exercise.Name}
      </div>
      {open && (
        <div className="flex flex-row justify-between bg-white">
          <div className={tableCSS}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Sets
            </div>
            {Array.from({ length: props.exercise.Sets }, (_, index) => (
              <div className={`${itemCSS} border-l-[1px]`} key={index}>
                {index + 1}
              </div>
            ))}
          </div>
          <div className={tableCSS}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Reps
            </div>
            {Array.from({ length: props.exercise.Sets }, (_, index) => (
              <div key={index} className={itemCSS}>
                <input placeholder={props.exercise.Reps} className={inputCSS} />
              </div>
            ))}
          </div>
          <div className={tableCSS}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Weights
            </div>
            {Array.from({ length: props.exercise.Sets }, (_, index) => (
              <div key={index} className={itemCSS}>
                <input
                  placeholder={props.exercise.Weight}
                  className={inputCSS}
                />
              </div>
            ))}
          </div>
          <div className={tableCSS}>
            <div className={`${titleCSS} border-r-[1px] border-white`}>
              Notes
            </div>
            <textarea className="w-full flex-grow border-b-[1px] border-t-0 border-l-0 border-r-[1px] border-slate-200 focus:ring-slate-300 focus:border-slate-200" />
          </div>
          <div className={tableCSS}>
            <div className={titleCSS}>Description</div>
            <div className="px-2 border-solid border-b-[1px] border-r-[1px] flex-grow text-gray-500">
              {props.exercise.Description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
