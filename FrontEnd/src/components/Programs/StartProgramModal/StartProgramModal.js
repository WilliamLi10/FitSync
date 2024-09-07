import { useEffect, useRef, useReducer, useContext } from "react";
import StartProgramWorkout from "./StartProgramWorkout";
import Cookies from "js-cookie";
import { refreshToken } from "../../../util/auth";
import moment from "moment";
import AuthContext from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import WorkoutContext from "../../../context/workout-context";

const formReducer = (state, action) => {
  switch (action.type) {
    case "startDate":
      return {
        ...state,
        startDate: action.value,
        isValid:
          !isBeforeToday(action.value) &&
          state.duration >= 1 &&
          state.squat >= 0 &&
          state.bench >= 0 &&
          state.deadlift >= 0,
      };
    case "duration":
      return {
        ...state,
        duration: parseInt(action.value, 10),
        isValid:
          !isBeforeToday(state.startDate) &&
          action.value >= 1 &&
          state.squat >= 0 &&
          state.bench >= 0 &&
          state.deadlift >= 0,
      };
    case "squat":
      return {
        ...state,
        squat: parseInt(action.value, 10),
        isValid:
          !isBeforeToday(state.startDate) &&
          state.duration >= 1 &&
          action.value >= 0 &&
          state.bench >= 0 &&
          state.deadlift >= 0,
      };
    case "bench":
      return {
        ...state,
        bench: parseInt(action.value, 10),
        isValid:
          !isBeforeToday(state.startDate) &&
          state.duration >= 1 &&
          state.squat >= 0 &&
          action.value >= 0 &&
          state.deadlift >= 0,
      };
    case "deadlift":
      return {
        ...state,
        deadlift: parseInt(action.value, 10),
        isValid:
          !isBeforeToday(state.startDate) &&
          state.duration >= 1 &&
          state.squat >= 0 &&
          state.bench >= 0 &&
          action.value >= 0,
      };
    case "unit":
      return {
        ...state,
        unit: state.unit === "lb" ? "kg" : "lb",
      };
    case "workouts":
      return {
        ...state,
        workouts: {
          ...state.workouts,
          [action.name]: parseInt(action.value, 10),
        },
      };
    default:
      return state;
  }
};

const isBeforeToday = (date) => {
  const today = moment().startOf("day");
  return moment(date).isBefore(today, "day");
};

const StartProgramModal = (props) => {
  const minStart = moment().format("YYYY-MM-DD");
  const minWeeks = 1;
  const modalRef = useRef(null);
  const authCTX = useContext(AuthContext);
  const workoutCTX = useContext(WorkoutContext)
  const navigate = useNavigate();

  const [form, setForm] = useReducer(formReducer, {
    startDate: minStart,
    duration: minWeeks,
    squat: 0,
    bench: 0,
    deadlift: 0,
    unit: "lb",
    workouts: Object.keys(props.workouts).reduce((acc, key) => {
      acc[props.workouts[key].Name] = 1;
      return acc;
    }, {}),
    isValid: true,
  });

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.modalHandler(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  const startProgram = () => {
    refreshToken()
      .then(() => {
        return fetch(
          `${process.env.REACT_APP_API_URL}/program/start-program?programID=${props.programID}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              startDate: form.startDate,
              duration: form.duration,
              workoutDays: form.workouts,
              isMetric: form.unit === "kg",
              maxes: {
                squatMax: form.squat,
                benchMax: form.bench,
                deadliftMax: form.deadlift,
              },
            }),
          }
        );
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw { error: data.error, status: response.status };
          });
        }
        navigate("/");
        workoutCTX.setStartProgramSuccessModal(true)
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
  };

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white flex flex-col px-9 py-7 shadow-md w-[60%] min-w-[500px] max-w-[700px]"
    >
      <p className="text-xl mb-5">Start Program</p>
      <div className="max-h-[500px] overflow-y-auto">
        <div className="flex">
          <div className="flex flex-col mr-5">
            <label>Start Date</label>
            <input
              type="date"
              min={minStart}
              value={form.startDate}
              className="bg-slate-100"
              onChange={(event) => {
                setForm({ type: "startDate", value: event.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Duration in Weeks</label>
            <input
              type="number"
              min={minWeeks}
              value={form.duration}
              className="bg-slate-100"
              onChange={(event) => {
                setForm({ type: "duration", value: event.target.value });
              }}
            />
          </div>
        </div>
        <div className="mt-5 mr-5">
          <p className="mb-5 font-bold">
            Enter the day of the week each workout will be performed
          </p>
          {Object.entries(form.workouts).map(([name, value]) => (
            <StartProgramWorkout
              name={name}
              key={name}
              value={value}
              updateDay={setForm}
            />
          ))}
        </div>
        <p className="font-bold">Enter your one rep maxes</p>
        <div className="flex flex-row items-center mt-5">
          <p className="font-thin">kg</p>
          <button
            onClick={() => {
              setForm({ type: "unit" });
            }}
            className="rounded-full w-12 h-6 bg-slate-500 mx-2"
          >
            <div
              className={`bg-white ml-1 w-5 h-5 rounded-full transform duration-300 ease-in-out ${
                form.unit === "lb" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <p className="font-thin">lb</p>
        </div>
        <div className="flex flex-row justify-evenly mt-5">
          <div className="flex flex-col w-[25%]">
            <label>Squat</label>
            <input
              type="Number"
              min={0}
              value={form.squat}
              className="bg-slate-100"
              onChange={(event) => {
                setForm({ type: "squat", value: event.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-[25%]">
            <label>Bench</label>
            <input
              type="Number"
              min={0}
              value={form.bench}
              className="bg-slate-100"
              onChange={(event) => {
                setForm({ type: "bench", value: event.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-[25%]">
            <label>Deadlift</label>
            <input
              type="Number"
              min={0}
              value={form.deadlift}
              className="bg-slate-100"
              onChange={(event) => {
                setForm({ type: "deadlift", value: event.target.value });
              }}
            />
          </div>
        </div>
      </div>

      <button
        className={` font-thin transition-all duration-300 border border-slate-500 px-4 py-2 mt-6 ${
          form.isValid
            ? "hover:bg-slate-500 bg-slate-700 text-white"
            : "text-black bg-white cursor-not-allowed"
        }`}
        onClick={startProgram}
        disabled={!form.isValid}
      >
        Start Program
      </button>
    </div>
  );
};

export default StartProgramModal;
