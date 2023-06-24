const CreateProgramWorkout = (props) => {

  const backHandler = (event) => {
    event.preventDefault();
    props.pageHandler({})
  };

  return (
    <form>
      <button
        onClick={backHandler}
        className="bg-slate-700 text-white px-5 py-2"
      >
        Back
      </button>
    </form>
  );
};

export default CreateProgramWorkout;
