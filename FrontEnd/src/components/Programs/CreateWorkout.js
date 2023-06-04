import React, { useState } from "react";

import WorkoutInfo from "./WorkoutInfo";

const CreateWorkout = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    frequency: "",
  });
  const [showInfo, setShowInfo] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleButtonClick = () => {
    setShowInfo (!showInfo);
  }

  return (
    <form className="flex  justify-center min-h-screen text-base">
      <WorkoutInfo
        formData={formData}
        handleChange={handleChange}
        showInfo={showInfo}
        onButtonClick={toggleButtonClick}
      />
    </form>
  );
};

export default CreateWorkout;
