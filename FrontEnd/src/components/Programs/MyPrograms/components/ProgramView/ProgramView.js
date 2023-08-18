import { useState, useEffect, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { refreshToken, getAccessToken } from "../../../../../util/auth";
import Workout from "./Workout";
import { useLoaderData, useNavigate } from "react-router-dom";
import AuthContext from "../../../../../context/auth-context";
import Cookies from "js-cookie";
import StatusBanner from "../../../../StatusBanner";
import { BsShare } from "react-icons/bs";
import ProgramShareModal from "./ProgramShareModal";

const ProgramView = () => {
  const ctx = useContext(AuthContext);
  const program = useLoaderData();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("");
  const [shareModal, setShareModal] = useState(false);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const workoutHandler = (workout, index) => {
    setWorkouts((prevWorkouts) => {
      const newWorkouts = [...prevWorkouts];
      newWorkouts[index] = workout;
      console.log(newWorkouts);
      return newWorkouts;
    });
  };

  const addWorkout = () => {
    setWorkouts([
      ...workouts,
      {
        Name: "Untitled",
        Exercises: [
          {
            Name: "Untitled",
            Sets: "",
            Reps: "",
            Weight: "",
            Rest: "",
            Description: "",
          },
        ],
        Unit: { weight: "lb", rest: "min" },
      },
    ]);
  };

  const removeWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
  };

  const duplicateWorkout = (index) => {
    const newWorkouts = [...workouts];
    const workoutToDuplicate = newWorkouts[index];
    newWorkouts.splice(index + 1, 0, { ...workoutToDuplicate });
    setWorkouts(newWorkouts);
  };

  const moveWorkout = (index, newIndex) => {
    const newWorkouts = [...workouts];
    const workout = newWorkouts.splice(index, 1)[0];
    newWorkouts.splice(newIndex, 0, workout);
    setWorkouts(newWorkouts);
  };

  useEffect(() => {
    if (program.error) {
      navigate("/error", {
        state: { error: program.error, status: program.status },
      });
    } else {
      setWorkouts(program.workouts);
      setTitle(program.name);
      refreshToken()
        .then(() => {
          return fetch("http://localhost:5000/program/update-last-opened", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              id: program._id,
            }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw { error: data.error, status: response.status };
            });
          }
        })
        .catch((error) => {
          if (error.response === 401) {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.reload();
            ctx.setLoginModal(true);
            ctx.setStatus("Session timed out: You have been logged out");
          } else {
            navigate("/error", {
              state: { error: error.error, status: error.status },
            });
          }
        });
    }
  }, []);

  const saveProgram = (event) => {
    event.preventDefault();

    let hasError = false;
    for (let i = 0; i < workouts.length; i++) {
      for (let j = 0; j < workouts[i].Exercises.length; j++) {
        const exercise = workouts[i].Exercises[j];
        const set = Number(exercise.Sets);
        const rep = Number(exercise.Reps);
        const weight = Number(exercise.Weight);
        const rest = Number(exercise.Rest);
        if (isNaN(set) || set <= 0 || !Number.isInteger(set)) {
          hasError = true;
          break;
        }
        if (isNaN(rep) || rep <= 0 || !Number.isInteger(rep)) {
          hasError = true;
          break;
        }
        if (
          isNaN(weight) ||
          weight < 0 ||
          workouts[i].Exercises[j].Weight === ""
        ) {
          hasError = true;
          break;
        }
        if (isNaN(rest) || rest < 0 || workouts[i].Exercises[j].Rest === "") {
          hasError = true;
          break;
        }
      }
      if (hasError) {
        break;
      }
    }

    refreshToken()
      .then(() => {
        return fetch("http://localhost:5000/program/save-program", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            program: {
              workouts: workouts,
              name: title,
              valid: !hasError,
              lastModified: { user: getAccessToken().userID, date: Date() },
            },
            id: program._id,
          }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw { error: data.error, status: response.status };
          });
        }
        return response.json();
      })
      .then(() => {
        setStatus(
          `Saved.${
            hasError ? " Please include a value for every exercise field." : ""
          }`
        );
      })
      .catch((error) => {
        if (error.response === 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.reload();
          ctx.setLoginModal(true);
          ctx.setStatus("Session timed out: You have been logged out");
        } else {
          navigate("/error", {
            state: { error: error.error, status: error.status },
          });
        }
      });
  };

  const shareModalHandler = (event) => {
    event.preventDefault();
    setShareModal(true);
  };

  return (
    <form className="bg-gray-50 w-full h-full px-5 py-5">
      {status !== "" && (
        <StatusBanner
          msg={status}
          closeHandler={() => {
            setStatus("");
          }}
        />
      )}
      {shareModal && (
        <ProgramShareModal
          modalHandler={setShareModal}
          title={title}
          programID={program._id}
        />
      )}
      {shareModal && (
        <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
      )}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <button
            onClick={() => {
              navigate("/programs/myprograms");
            }}
          >
            <BiArrowBack className="h-8" />
          </button>
          <input
            value={title}
            placeholder="Untitled"
            type="text"
            onChange={titleHandler}
            disabled={program.userRole === "viewer"}
            className="border-none bg-gray-50 pl-2 ml-2 h-6 py-1 rounded-md transition-all duration-300 hover:border-solid hover:border-[1px] focus:border-none"
          />
        </div>
        <div>
          <button
            className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 rounded-full hover:bg-slate-100"
            onClick={shareModalHandler}
          >
            <BsShare /> &#160;Share
          </button>
        </div>
      </div>
      {workouts.map((workout, index) => {
        return (
          <Workout
            key={index}
            workout={workout}
            workouts={workouts}
            update={workoutHandler}
            delete={removeWorkout}
            duplicate={duplicateWorkout}
            move={moveWorkout}
            index={index}
          />
        );
      })}
      {program.userRole === "editor" && (
        <div className="flex flex-row justify-between">
          <button
            className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 mt-5 hover:bg-slate-100"
            onClick={addWorkout}
            type="button"
          >
            <RiAddLine /> &#160;Add Workout
          </button>
          <button
            className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 mt-5 hover:bg-slate-100"
            type="submit"
            onClick={saveProgram}
          >
            <CiSaveDown2 />
            &#160;Save Program
          </button>
        </div>
      )}
    </form>
  );
};

export default ProgramView;
