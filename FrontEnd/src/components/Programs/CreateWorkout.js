import React, { useState } from "react";

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
    <form className="flex  justify-center min-h-screen text-2xl">
      <div className="flex flex-col gap-4 bg-slate-700 rounded-lg  h-1/5 w-3/5 mt-40 p-10">
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
          <label className="block text-white">Weekly Weight Adjustments:</label>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="progression"
              value="none"
              checked={formData.progression === "none"}
              onChange={handleChange}
            />
            <label className="block text-white">None</label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="progression"
              value="linear"
              checked={formData.progression === "linear"}
              onChange={handleChange}
            />
            <label className="block text-white">Linear</label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="progression"
              value="custom"
              checked={formData.progression === "custom"}
              onChange={handleChange}
            />
            <label className="block text-white">Custom</label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="progression"
              value="performance based"
              checked={formData.progression === "performance based"}
              onChange={handleChange}
            />
            <label className="block text-white">Performance Based</label>
          </div>
        </div>

        {/* Add the submit button and form submission logic */}
      </div>
    </form>
  );
};

export default CreateWorkout;
