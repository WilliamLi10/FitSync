import React, { useState } from "react";
import ProgressionItem from "./Progression/ProgressionItem";

const CreateWorkout = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    frequency: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex  justify-center min-h-screen text-base">
      <div className="flex flex-col gap-4 bg-slate-700 rounded-lg  h-1/5 w-3/5 mt-10 p-10">
        <div>
          <label className="block text-white">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>
        <div>
          <label className="block text-white">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
          </div>
          <div>
            <label className="block text-white">Frequency (Days/Week):</label>
            <input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
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
              checked={formData.progression === "none"}
              desc="Weights will be kept constant throughout program"
              onClick={handleChange}
            />
            <ProgressionItem
              type={"Linear"}
              value={"linear"}
              checked={formData.progression === "linear"}
              desc="A constant increment will be added to each main exercise weekly"
              onClick={handleChange}
            />
          </div>
          <div className="flex flex-row gap-4">
            <ProgressionItem
              type={"Custom"}
              value={"custom"}
              checked={formData.progression === "custom"}
              desc="Weekly weight adjustments will be determined by the user"
              onClick={handleChange}
            />
            <ProgressionItem
              type={"Performance Based"}
              value={"performance based"}
              checked={formData.progression === "performance based"}
              desc="Weekly weight adjustments will be made based on last week's performance"
              onClick={handleChange}
            />
          </div>
        </div>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-slate-400 via-slate-450 to-slate-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-100 dark:focus:slate-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default CreateWorkout;
