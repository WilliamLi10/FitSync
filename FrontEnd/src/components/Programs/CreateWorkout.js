import React, { useState } from "react";

const CreateWorkout = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <div>
          <label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
             Weeks Long
          </label>
          <label>
            <input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            />
             Days/Week
          </label>
        </div>
      </div>
      {/* Add the submit button and form submission logic */}
    </form>
  );
};

export default CreateWorkout;
