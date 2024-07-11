import ProgramItem from "./ProgramItem";

const ProgramList = (props) => {
  return (
    <div className="mb-5">
      <div className="pl-3 mb-3 text-md font-semibold">{props.type}</div>
      <div className="bg-white rounded-md shadow-sm px-3 py-3 min-w-[500px] flex flex-col w-full">
        <div className="flex flex-row pr-5 border-solid border-b-[1px]">
          <div className="w-[60%] font-bold text-sm">Name</div>
          <div className="w-[20%] font-bold text-sm">Owner</div>
          <div className="w-[20%] font-bold text-sm">Last Opened</div>
        </div>
        {props.programs.map((program) => {
          return <ProgramItem program={program} key={program._id} />;
        })}
      </div>
    </div>
  );
};

export default ProgramList;
