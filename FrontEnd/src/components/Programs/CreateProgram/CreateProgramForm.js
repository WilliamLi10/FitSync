import { useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: { value: action.val, valid: action.val !== "" },
        next: action.val !== "" && state.dur.valid && state.freq.valid,
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
          state.title.valid &&
          state.freq.valid,
      };
    case "freq":
      return {
        ...state,
        freq: { value: action.val, valid: action.val !== "" },
        next:
          Number.isInteger(parseFloat(action.val)) &&
          parseFloat(action.val) > 0 &&
          parseFloat(action.val) < 8 &&
          state.dur.valid &&
          state.title.valid,
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

  const inputCSS =
    "border-solid border-black border-opacity-50 mt-16 px-[8px] transition bg-slate-100 focus:outline-none focus:border-slate-700";

  const asteriskCSS = "text-red-500 ml-1 h-0";

  return (
    <form className="flex flex-col w-[50%] min-w-[500px] px-4">
      <h1 className="text-2xl font-md mt-10 text-center">Create a Program</h1>
      <div className="flex items-center">
        <input
          placeholder="Title"
          value={form.title.value}
          onChange={titleHandler}
          className={`${inputCSS} w-full border-b-[1px] focus:border-b-2`}
        />
        <span className={asteriskCSS}>*</span>
      </div>
      <textarea
        placeholder="Description"
        value={form.desc.value}
        onChange={descHandler}
        className={`${inputCSS} border-solid border-black mt-16 w-full border-[1px] h-16 focus:ring-transparent focus:border-2`}
      />
      <div className="flex w-full items-center">
        <input
          placeholder="Duration (in Weeks)"
          value={form.dur.value}
          onChange={durHandler}
          type="number"
          min="1"
          step="1"
          className={`${inputCSS} w-[50%] border-0 border-b-[1px] focus:border-b-2 focus:ring-transparent`}
        />
        <span className={asteriskCSS}>*</span>
        <input
          placeholder="Frequency (Days per Week)"
          value={form.freq.value}
          onChange={freqHandler}
          type="number"
          min="1"
          max="7"
          step="1"
          className={`${inputCSS} w-[50%] border-0 border-b-[1px] focus:border-b-2 focus:ring-transparent `}
        />
        <span className={asteriskCSS}>*</span>
      </div>
      <button
        className={`border-solid border-[1px] border-opacity-50 px-5 py-2 mt-16 ml-auto mr-10 ${
          form.next
            ? "border-none bg-slate-700 text-white hover:bg-slate-500"
            : "border-black"
        }`}
        disabled={!form.next}
        onClick={nextHandler}
      >
        Next
      </button>
    </form>
  );
};

export default CreateProgramForm;
