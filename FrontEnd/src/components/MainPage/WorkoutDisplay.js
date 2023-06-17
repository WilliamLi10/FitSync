import { useState } from "react";
import moment from "moment";
import WorkoutContainer from "./WorkoutContainer";
import MiniCalendar from "./MiniCalendar/MiniCalendar";

const WorkoutDisplay = (props) => {
  const getWeekRange = (day) => {
    const end = day.clone().endOf("week");
    const dates = [];

    let currDate = day.clone().startOf("week");
    while (currDate.isSameOrBefore(end, "day")) {
      dates.push({
        dayOfWeek: currDate.format("dddd"),
        day: currDate.format("DD"),
        month: currDate.format("MMMM"),
        year: currDate.format("YYYY"),
        date: currDate.toISOString(),
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
      <MiniCalendar weekHandler={weekHandler} />
      <div className="w-[100%] mt-5">
        <div className="text-2xl text-center mb-5">
          <p>{`${week[3].month} ${week[3].year}`}</p>
        </div>
        <div className="flex mr-7">
          {week.map((day) => {
            return (
              <WorkoutContainer
                key={`${day.month}/${day.day}/${day.year}`}
                dayOfWeek={day.dayOfWeek}
                date={day.date}
                day={day.day}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
