const ExerciseSet = (props) => {
  return (
    <div
      className={`m-0 text-sm font-semibold bg-white border-solid border-t-[1px] px-4 py-3 hover:bg-slate-50 ${
        props.isLast && "rounded-b-xl"
      }`}
    >
      Set {props.val + 1}
    </div>
  );
};

export default ExerciseSet;
