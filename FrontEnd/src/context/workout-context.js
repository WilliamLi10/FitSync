import { createContext, useEffect, useState } from "react";
import moment from "moment";

const WorkoutContext = createContext();

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

const getDate = (date) => {
  return date.startOf("day").toISOString();
};

export const WorkoutContextProvider = (props) => {
  const [week, setWeek] = useState(getWeekRange(moment()));
  const [day, setDay] = useState(getDate(moment()));
  const [calendarData, setCalendarData] = useState();
  const [tasks, setTasks] = useState();
  const [startProgramSuccessModal, setStartProgramSuccessModal] =
    useState(false);

  const dayInc = () => {
    setDay((prevDay) => getDate(moment(prevDay).add(1, "day")));
  };

  const dayDec = () => {
    setDay((prevDay) => getDate(moment(prevDay).subtract(1, "day")));
  };

  const weekHandler = (date) => {
    setWeek(getWeekRange(moment(date)));
    setDay(getDate(moment(date)));
  };

  useEffect(() => {
    const workout = calendarData?.workouts?.filter((workout) => workout.date === day);
    setTasks(workout);
  }, [day, calendarData]);

  return (
    <WorkoutContext.Provider
      value={{
        week: week,
        setWeek: setWeek,
        weekHandler: weekHandler,
        day: day,
        setDay: setDay,
        calendarData: calendarData,
        setCalendarData: setCalendarData,
        tasks: tasks,
        dayInc: dayInc,
        dayDec: dayDec,
        startProgramSuccessModal: startProgramSuccessModal,
        setStartProgramSuccessModal: setStartProgramSuccessModal,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
