const ProgressionItem = (props) => {
  return (
    <div
      className=" pl-4 cursor-pointer flex items-center mb-4 gap-2 h-auto w-1/2 py-2 bg-slate-500 border border-gray-200 rounded dark:border-gray-700"
      onClick={props.onClick}
    >
      <div class="flex items-center h-5">
        <input
          type="radio"
          name="progression"
          value={props.value}
          checked={props.checked}
          onChange={props.onClick}
        />
      </div>
      <div class="ml-2 text-base">
        <label className="block text-white">{props.type}</label>
        <p
          id="helper-radio-text"
          className="text-xs font-normal text-white dark:text-gray-300"
        >
          {props.desc}
        </p>
      </div>
    </div>
  );
};

export default ProgressionItem;
