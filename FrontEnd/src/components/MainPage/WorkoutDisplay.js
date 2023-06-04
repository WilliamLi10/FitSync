import { useState, useEffect } from "react";
import moment from "moment";
import WorkoutContainer from "./WorkoutContainer";
import Workout from "./Workout";
import NoActiveWorkoutOverlay from "./NoActiveWorkoutOverlay";

const WorkoutDisplay = (props) => {
  const getWeekRange = (day) => {
    const end = day.clone().endOf("isoWeek");

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

  console.log(week);

  return (
    <div className={props.className}>
      {week.map((day) => {
        console.log(day);
        return (
          <WorkoutContainer
            key={`${day.day}/${day.month}/${day.year}`}
            dayOfWeek={day.dayOfWeek}
            date={`${day.day}/${day.month}/${day.year}`}
          />
        );
      })}
    </div>
  );
};

export default WorkoutDisplay;
