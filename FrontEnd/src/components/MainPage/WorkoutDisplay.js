import { useState, useEffect } from "react";
import moment from "moment";
import WorkoutContainer from "./WorkoutContainer";
import WorkoutMiniCalendar from "./WorkoutMiniCalendar";
import Workout from "./Workout";
import NoActiveWorkoutOverlay from "./NoActiveWorkoutOverlay";

const WorkoutDisplay = (props) => {
  const getWeekRange = (day) => {
    const end = day.clone().endOf("isoWeek");

    console.log(day);

    const dates = [];
    let currDate = day.clone().startOf("isoWeek");
    while (currDate.isSameOrBefore(end, "day")) {
      dates.push({
        dayOfWeek: currDate.format("dddd"),
        day: currDate.format("DD"),
        month: currDate.format("MM"),
        year: currDate.format("YYYY"),
      });
      currDate.add(1, "day");
    }

    return dates;
  };

  const [week, setWeek] = useState(getWeekRange(moment()));

  const weekHandler = (date) => {
    setWeek(getWeekRange(moment(date)));
  };

  return (
    <div className={props.className}>
      <WorkoutMiniCalendar weekHandler={weekHandler} />
      {week.map((day) => {
        return (
          <WorkoutContainer
            key={`${day.month}/${day.day}/${day.year}`}
            dayOfWeek={day.dayOfWeek}
            date={`${day.month}/${day.day}/${day.year}`}
          />
        );
      })}
    </div>
  );
};

export default WorkoutDisplay;
