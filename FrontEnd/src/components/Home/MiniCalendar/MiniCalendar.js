import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MiniCalendar.css";
import WorkoutContext from "../../../context/workout-context";

const MiniCalendar = () => {
  const ctx = useContext(WorkoutContext);
  const [date, setDate] = useState(null);

  const dateHandler = (newDate) => {
    ctx.weekHandler(newDate);
    setDate(newDate);
  };

  return (
    <div className="bg-white rounded-md p-2 shadow-sm">
      <DatePicker
        selected={date}
        onChange={dateHandler}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        inline
      />
    </div>
  );
};

export default MiniCalendar;
