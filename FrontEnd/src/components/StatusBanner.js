const StatusBanner = (props) => {
  return (
    <div className="flex flex-row justify-between items-center bg-blue-100 px-4 py-2 font-thin text-sm">
      {props.msg}
      <button onClick={props.closeHandler}>x</button>
    </div>
  );
};

export default StatusBanner;
