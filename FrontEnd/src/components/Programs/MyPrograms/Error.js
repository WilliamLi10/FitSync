const Error = (props) => {
  return (
    <div className="bg-white shadow-sm rounded-md px-4 py-2 border-l-red-500 border-solid border-l-8 mt-5">
      {props.msg}
    </div>
  );
};

export default Error;
