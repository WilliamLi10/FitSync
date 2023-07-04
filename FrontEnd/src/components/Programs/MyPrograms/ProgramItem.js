const ProgramItem = (props) => {
  return (
    <div className="flex flex-row text-sm font-thin border-solid border-b-[1px] py-2 cursor-pointer transition-all duration-300 hover:bg-gray-50">
      <div className="w-[60%] overflow-hidden overflow-ellipsis whitespace-nowrap pr-3">
        {props.program.Name}
      </div>
      <div className="w-[20%] overflow-hidden overflow-ellipsis whitespace-nowrap pr-3">
        {props.program.Owner}
      </div>
      <div className="w-[20%] overflow-hidden overflow-ellipsis whitespace-nowrap pr-3">
        Jan 13, 2003
      </div>
    </div>
  );
};

export default ProgramItem;
