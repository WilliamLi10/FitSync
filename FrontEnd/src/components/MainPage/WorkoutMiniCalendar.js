import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkoutMiniCalendar = (props) => {
  const [date, setDate] = useState(null);

  const dateHandler = (newDate) => {
    props.weekHandler(newDate);
    setDate(newDate);
  };

  return (
    <div>
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

export default WorkoutMiniCalendar;
