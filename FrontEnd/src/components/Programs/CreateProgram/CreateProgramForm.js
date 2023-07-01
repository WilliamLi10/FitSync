import { useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: { value: action.val, valid: action.val !== "" },
        next: action.val !== "" && state.dur.valid,
      };
    case "desc":
      return {
        ...state,
        desc: { value: action.val },
      };
    case "dur":
      return {
        ...state,
        dur: { value: action.val, valid: action.val !== "" },
        next:
          Number.isInteger(parseFloat(action.val)) &&
          parseFloat(action.val) > 0 &&
          state.title.valid,
      };
    case "freq":
      return {
        ...state,
        freq: { value: action.val },
      };
    default:
      return state;
  }
};

const CreateProgramForm = (props) => {
  const [form, setForm] = useReducer(formReducer, {
    ...props.data,
  });

  const titleHandler = (event) => {
    setForm({ type: "title", val: event.target.value });
  };

  const descHandler = (event) => {
    setForm({ type: "desc", val: event.target.value });
  };

  const durHandler = (event) => {
    setForm({ type: "dur", val: event.target.value });
  };

  const freqHandler = (event) => {
    setForm({ type: "freq", val: event.target.value });
  };

  const nextHandler = (event) => {
    event.preventDefault();
    props.pageHandler(form);
  };

  return (
    <form className="bg-white m-auto mt-24 shadow-sm rounded-md flex flex-col px-16 py-16 w-[50%] min-w-[500px]">
      <h1 className="text-2xl mb-8">Create a Program</h1>
      <div className="flex flex-row mb-5 w-full">
        <div className="flex flex-col mr-5 w-1/3">
          <label className="font-thin">Title</label>
          <input
            value={form.title.value}
            onChange={titleHandler}
            className="h-8 p-1 bg-slate-50 border-slate-300 focus:border-none"
            type="text"
          />
        </div>
        <div className="flex flex-col mr-5 w-1/3">
          <label className="font-thin">Frequency</label>
          <select
            className="h-8 p-1 bg-slate-50 border-slate-300 focus:border-none"
            value={form.freq.value}
            onChange={freqHandler}
          >
            <option value="1">
              Once a week
            </option>
            <option value="2">Twice a week</option>
            <option value="3">Three times a week</option>
            <option value="4">Four times a week</option>
            <option value="5">Five times a week</option>
            <option value="6">Six times a week</option>
            <option value="7">Every day</option>
          </select>
        </div>
        <div className="flex flex-col w-1/6">
          <label className="font-thin">Weeks</label>
          <input
            value={form.dur.value}
            onChange={durHandler}
            type="number"
            min="1"
            step="1"
            className="h-8 p-1 bg-slate-50 border-slate-300 focus:border-none"
          />
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <label className="font-thin">Description</label>
        <textarea
          value={form.desc.value}
          onChange={descHandler}
          className="p-1 h-36 bg-slate-50 border-slate-300 focus:border-none"
        />
      </div>
      <div className="flex flex-row justify-end">
        <button
          disabled={!form.next}
          onClick={nextHandler}
          className={`transition-all duration-300 px-4 py-2 ${
            form.next
              ? "bg-slate-700 text-white hover:bg-slate-600"
              : "bg-white text-black border-solid border-[1px] border-[#6B7280]"
          }`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CreateProgramForm;
