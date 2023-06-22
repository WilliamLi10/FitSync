const SideBarSelector = (props) => {
  return (
    <div
      className={`text-white flex items-center py-10 px-5 gap-4 hover:bg-gray-500 cursor-pointer h-[6rem] ${props.className} `}
      onClick={props.onClick}
    >
      <div>{props.image}</div>
      <h1 className="text-xl">{props.desc}</h1>
    </div>
  );
};

export default SideBarSelector;
