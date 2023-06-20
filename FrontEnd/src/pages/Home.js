import { useState } from "react";
import moment from "moment";
import Calendar from "../components/Home/Calendar";
import MiniCalendar from "../components/Home/MiniCalendar/MiniCalendar";

const Home = (props) => {
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
    <div className="flex flex-row h-screen w-screen">
      <MiniCalendar weekHandler={weekHandler} />
      <Calendar week={week} />
    </div>
  );
};

export default Home;
