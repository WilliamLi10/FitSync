import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MiniCalendar = (props) => {
  const [date, setDate] = useState(null);

  const dateHandler = (newDate) => {
    props.weekHandler(newDate);
    setDate(newDate);
  };

  return (
    <DatePicker
      selected={date}
      onChange={dateHandler}
      dateFormat="dd/MM/yyyy"
      showPopperArrow={false}
      inline
    />
  );
};

export default MiniCalendar;
