const SideBarSelector = (props) => {
  return (
    <div
      className={`flex items-center py-10 px-5 gap-4 hover:bg-slate-50 cursor-pointer h-[6rem] ${props.className} `}
      onClick={props.onClick}
    >
      <div className="h-5 w-5">{props.image}</div>
      {props.desc && <h1 className="text-md">{props.desc}</h1>}
    </div>
  );
};

export default SideBarSelector;
