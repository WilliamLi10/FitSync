import ProgressionItem from "./Progression/ProgressionItem";
import {FaChevronDown} from "react-icons/fa";
const WorkoutInfo = (props) => {
  return props.showInfo ? (
    <div className="flex flex-col gap-4 bg-slate-700 rounded-lg  h-1/5 w-3/5 mt-10 p-10">
      <div>
        <label className="block text-white">Title:</label>
        <input
          type="text"
          name="title"
          value={props.formData.title}
          onChange={props.handleChange}
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div>
        <label className="block text-white">Description:</label>
        <textarea
          name="description"
          value={props.formData.description}
          onChange={props.handleChange}
          className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </div>
      <div className="flex flex-row gap-20">
        <div>
          <label className="block text-white">Duration (Weeks):</label>
          <div>
            <input
              type="text"
              name="duration"
              value={props.formData.duration}
              onChange={props.handleChange}
              className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
        </div>
        <div>
          <label className="block text-white">Frequency (Days/Week):</label>
          <input
            type="text"
            name="frequency"
            value={props.formData.frequency}
            onChange={props.handleChange}
            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>
      </div>
      <div>
        <label className="block text-white mb-4">
          Weekly Weight Adjustments:
        </label>
        <div className="flex flex-row gap-4">
          <ProgressionItem
            type={"None"}
            value={"none"}
            checked={props.formData.progression === "none"}
            desc="Weights will be kept constant throughout program"
            onClick={props.handleChange}
          />
          <ProgressionItem
            type={"Linear"}
            value={"linear"}
            checked={props.formData.progression === "linear"}
            desc="A constant increment will be added to each main exercise weekly"
            onClick={props.handleChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <ProgressionItem
            type={"Custom"}
            value={"custom"}
            checked={props.formData.progression === "custom"}
            desc="Weekly weight adjustments will be determined by the user"
            onClick={props.handleChange}
          />
          <ProgressionItem
            type={"Performance Based"}
            value={"performance based"}
            checked={props.formData.progression === "performance based"}
            desc="Weekly weight adjustments will be made based on last week's performance"
            onClick={props.handleChange}
          />
        </div>
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-slate-400 via-slate-450 to-slate-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={props.onButtonClick}
      >
        Continue
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-4 bg-slate-700 rounded-lg  h-1/5 w-full mt-5 mx-5 pt-5">
      <h1 className="text-white text-center text-3xl">{props.formData.title}</h1>
      <div className = "text-white  rounded-b-lg w-full border-t-[1px] border-t-slate-500 flex justify-center py-5 hover:bg-gray-500 cursor-pointer" onClick = {props.onButtonClick}><FaChevronDown   /></div>
      
    </div>
  );
};

export default WorkoutInfo;
