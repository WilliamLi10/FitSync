import ProgramItem from "./ProgramItem";

const ProgramList = (props) => {
  return (
    <div className="bg-white rounded-md shadow-sm px-3 py-3 min-w-[500px]flex flex-col">
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
      <ProgramItem />
    </div>
  );
};

export default ProgramList;
