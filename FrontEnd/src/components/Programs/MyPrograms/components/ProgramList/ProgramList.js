import ProgramItem from "./ProgramItem";

const ProgramList = (props) => {
  return (
    <div className="mb-5">
      <div className="pl-3 mb-3 text-md font-semibold">{props.type}</div>
      <div className="bg-white rounded-md shadow-sm px-3 py-3 min-w-[500px] flex flex-col w-full">
        <div className="flex flex-row">
          <div className="w-[60%] font-bold text-sm border-solid border-b-[1px]">
            Name
          </div>
          <div className="w-[20%] font-bold text-sm border-solid border-b-[1px]">
            Owner
          </div>
          <div className="w-[20%] font-bold text-sm border-solid border-b-[1px]">
            Last Opened
          </div>
        </div>
        {props.programs.map((program, index) => {
          return (
            <ProgramItem
              program={program}
              key={program._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgramList;
