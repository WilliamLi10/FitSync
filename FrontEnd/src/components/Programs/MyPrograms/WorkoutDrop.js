const WorkoutDrop = () => {
  const optionCSS = "transition-all duration-150 hover:bg-slate-200 px-2 py-1";
  
  return (
    <div className="flex flex-col border-solid border-[1px] fixed bg-white">
      <div className={optionCSS}>Duplicate</div>
      <div className={optionCSS}>Delete</div>
    </div>
  );
};

export default WorkoutDrop;
