import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MiniCalendar.css";

const MiniCalendar = (props) => {
  const [date, setDate] = useState(null);

  const dateHandler = (newDate) => {
    props.weekHandler(newDate);
    setDate(newDate);
  };

  return (
    <div className="m-10">
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
