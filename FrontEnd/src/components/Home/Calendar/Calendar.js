import { useContext, useEffect, useState } from "react";
import CalendarDay from "./CalendarDay";
import AuthContext from "../../../context/auth-context";
import { refreshToken } from "../../../util/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import WorkoutContext from "../../../context/workout-context";

const Calendar = () => {
  const authCTX = useContext(AuthContext);
  const workoutCTX = useContext(WorkoutContext)
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken()
      .then(() => {
        return fetch(
          `${process.env.REACT_APP_API_URL}/workout/get-workouts?startDate=${workoutCTX.week[0].date}&endDate=${workoutCTX.week[6].date}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw { error: data.error, status: response.status };
          });
        }
        return response.json();
      })
      .then((data) => {
        workoutCTX.setCalendarData(data);
      })
      .catch((error) => {
        if (error.response === 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.reload();
          authCTX.setLoginModal({ type: "login" });
          authCTX.setStatus("Session timed out: You have been logged out");
        } else {
          navigate("/error", {
            state: { error: error.error, status: error.status },
          });
        }
      });
  }, [workoutCTX.week]);

  return (
    <div className="w-full ml-10 bg-white py-4 flex flex-col rounded-md shadow-sm">
      <div className="text-2xl text-center mb-5">
        {`${workoutCTX.week[3].month} ${workoutCTX.week[3].year}`}
      </div>
      <div className="flex justify-center flex-grow">
        {workoutCTX.calendarData?.workouts && workoutCTX.week.map((day) => {
          const workouts = workoutCTX.calendarData.workouts.filter(workout => workout.date === day.date)

          return (
            <CalendarDay
              key={day.date}
              dayOfWeek={day.dayOfWeek}
              date={day.date}
              day={day.day}
              workouts={workouts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
