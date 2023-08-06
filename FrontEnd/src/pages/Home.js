import { useState } from "react";
import moment from "moment";
import Calendar from "../components/Home/Calendar/Calendar";
import MiniCalendar from "../components/Home/MiniCalendar/MiniCalendar";
import Dashboard from "../components/Home/Dashboard";
import Task from "../components/Home/Task/Task";
import About from "./LoggedOut/About";
import { checkAccess } from "../util/auth";

const Home = () => {
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
    return date.toISOString();
  };

  const [week, setWeek] = useState(getWeekRange(moment()));
  const [day, setDay] = useState(getDate(moment()));

  const weekHandler = (date) => {
    setWeek(getWeekRange(moment(date)));
    setDay(getDate(moment(date)));
  };

  return checkAccess() ? (
    <div className="flex flex-col h-screen w-screen bg-gray-50 px-10 py-5 min-w-[1200px] mt-16">
      <div>
        <Dashboard />
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col">
          <MiniCalendar weekHandler={weekHandler} />
          <Task day={day} />
        </div>
        <Calendar week={week} />
      </div>
    </div>
  ) : (
    <About />
  );
};

export default Home;
