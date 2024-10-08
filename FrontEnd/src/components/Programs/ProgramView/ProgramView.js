import { useState, useEffect, useContext } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { refreshToken, getAccessToken } from "../../../util/auth";
import Workout from "./Workout";
import { useLoaderData, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import Cookies from "js-cookie";
import StatusBanner from "../../StatusBanner";
import { BsShare } from "react-icons/bs";
import ProgramShareModal from "../ProgramShareModal/ProgramShareModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdOutlineDragHandle } from "react-icons/md";
import cloneDeep from "lodash/cloneDeep";
import StartProgramModal from "../StartProgramModal/StartProgramModal";

const ProgramView = () => {
  const ctx = useContext(AuthContext);
  const program = useLoaderData();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [startProgramModal, setStartProgramModal] = useState(false);
  const [drag, setDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [disableStartProgram, setDisableStartProgram] = useState(true);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const workoutHandler = (workout, index) => {
    setWorkouts((prevWorkouts) => {
      const newWorkouts = [...prevWorkouts];
      newWorkouts[index] = workout;
      console.log(workout.Unit);
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
            Intensity: "",
            Rest: "",
            Description: "",
          },
        ],
        Unit: { intensity: "RPE", rest: "min" },
      },
    ]);
  };

  const handleDrag = (draggedItem) => {
    if (draggedItem.type === "exercise") {
      setIsDragging(true);
    }
  };

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    if (droppedItem.type === "workout") {
      var updatedWorkout = [...workouts];
      const [reorderedWorkout] = updatedWorkout.splice(
        droppedItem.source.index,
        1
      );
      updatedWorkout.splice(droppedItem.destination.index, 0, reorderedWorkout);
      setWorkouts(updatedWorkout);
    } else if (droppedItem.type === "exercise") {
      if (droppedItem.destination.droppableId.split("-")[0] === "delete") {
        const dstIndex = parseInt(
          droppedItem.destination.droppableId.split("-")[1]
        );
        const srcIndex = parseInt(droppedItem.source.droppableId.split("-")[1]);
        if (dstIndex !== srcIndex) {
          return;
        }
        var updatedWorkout = [...workouts];
        var updatedExercise = [...updatedWorkout[srcIndex].Exercises];
        if (updatedExercise.length === 1) {
          return;
        }
        updatedExercise.splice(droppedItem.source.index, 1);
        updatedWorkout[srcIndex].Exercises = updatedExercise;
        setWorkouts(updatedWorkout);
      } else {
        const srcWorkoutIndex = parseInt(
          droppedItem.source.droppableId.split("-")[1]
        );
        const dstWorkoutIndex = parseInt(
          droppedItem.destination.droppableId.split("-")[1]
        );
        const srcWorkout = workouts[srcWorkoutIndex];
        const dstWorkout = workouts[dstWorkoutIndex];
        var updatedSrc = [...srcWorkout.Exercises];
        if (updatedSrc.length === 1) {
          return;
        }
        const [reorderedExercise] = updatedSrc.splice(
          droppedItem.source.index,
          1
        );
        var updatedWorkout = [...workouts];
        if (srcWorkoutIndex === dstWorkoutIndex) {
          updatedSrc.splice(
            droppedItem.destination.index,
            0,
            reorderedExercise
          );
        } else {
          var updatedDst = [...dstWorkout.Exercises];
          updatedDst.splice(
            droppedItem.destination.index,
            0,
            reorderedExercise
          );
          updatedWorkout[dstWorkoutIndex].Exercises = updatedDst;
        }
        updatedWorkout[srcWorkoutIndex].Exercises = updatedSrc;
        setWorkouts(updatedWorkout);
        setIsDragging(false);
      }
    }
  };

  const removeWorkout = (index) => {
    const newWorkouts = [...workouts];
    newWorkouts.splice(index, 1);
    setWorkouts(newWorkouts);
  };

  const duplicateWorkout = (index) => {
    const newWorkouts = [...workouts];
    const workoutToDuplicate = newWorkouts[index];
    const duplicatedWorkout = cloneDeep(workoutToDuplicate);
    duplicatedWorkout.Name = `Copy of ${workoutToDuplicate.Name}`;
    newWorkouts.splice(index + 1, 0, duplicatedWorkout);
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
      setDisableStartProgram(
        program.missingExerciseName || program.missingValue
      );
      refreshToken()
        .then(() => {
          return fetch(
            `${process.env.REACT_APP_API_URL}/program/update-last-opened?programID=${program._id}`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
              body: JSON.stringify({
                id: program._id,
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
        })
        .catch((error) => {
          if (error.response === 401) {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.reload();
            ctx.setLoginModal({ type: "login" });
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
    let missingValue = false;
    let dupTitle = false;
    let missingExerciseName = false;
    let titles = new Set([]);
    let i = 0;
    if (title == "") {
      setTitle("Untitled");
    }
    while (
      i < workouts.length &&
      (!missingValue || !dupTitle || !missingExerciseName)
    ) {
      dupTitle = titles.has(workouts[i].Name) || dupTitle;
      titles.add(workouts[i].Name);
      let j = 0;
      while (
        j < workouts[i].Exercises.length &&
        (!missingValue || !dupTitle || !missingExerciseName)
      ) {
        const exercise = workouts[i].Exercises[j];
        const set = Number(exercise.Sets);
        const rep = Number(exercise.Reps);
        const intensity = Number(exercise.Intensity);
        const rest = Number(exercise.Rest);
        missingExerciseName = missingExerciseName || exercise.Name == "";
        missingValue =
          isNaN(set) ||
          set <= 0 ||
          !Number.isInteger(set) ||
          isNaN(rep) ||
          rep <= 0 ||
          !Number.isInteger(rep) ||
          isNaN(intensity) ||
          intensity < 0 ||
          workouts[i].Exercises[j].Intensity === "" ||
          isNaN(rest) ||
          rest < 0 ||
          workouts[i].Exercises[j].Rest === "" ||
          missingValue;
        j++;
      }
      i++;
    }

    refreshToken()
      .then(() => {
        return fetch(
          `${process.env.REACT_APP_API_URL}/program/save-program?programID=${program._id}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              program: {
                workouts: workouts,
                name: title == "" ? "Untitled" : title,
                missingValue: missingValue,
                dupTitle: dupTitle,
                missingExerciseName: missingExerciseName,
                lastModified: { user: getAccessToken().userID, date: Date() },
              },
              programID: program._id,
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
        return response.json();
      })
      .then(() => {
        setStatus(
          `Saved. ${
            missingValue
              ? "Please include a value for every exercise field."
              : ""
          } ${dupTitle ? "Each workout needs to have a unique title." : ""} ${
            missingExerciseName
              ? "Each exercise must have a non-empty name."
              : ""
          }`
        );
        setDisableStartProgram(missingExerciseName || missingValue);
      })
      .catch((error) => {
        if (error.response === 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.reload();
          ctx.setLoginModal({ type: "login" });
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

  const startProgramModalHandler = (event) => {
    event.preventDefault();
    setStartProgramModal(true);
  };

  return (
    <div className="bg-gray-50 min-w-[900px] h-screen px-5 py-5">
      {startProgramModal && (
        <StartProgramModal
          modalHandler={setStartProgramModal}
          workouts={workouts}
          programID={program._id}
        />
      )}
      {startProgramModal && (
        <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
      )}
      {shareModal && (
        <ProgramShareModal
          modalHandler={setShareModal}
          title={title}
          programID={program._id}
          role={program.userRole}
          editPermissions={program.editorPermissions}
          isPublic={program.isPublic}
        />
      )}
      {shareModal && (
        <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
      )}
      <form>
        {status !== "" && (
          <StatusBanner
            msg={status}
            closeHandler={() => {
              setStatus("");
            }}
            className="mb-2"
          />
        )}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <button
              onClick={() => {
                navigate("/programs");
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
              className={`border-none bg-gray-50 pl-2 ml-2 h-6 py-1 rounded-md transition-all duration-300 ${
                program.userRole === "viewer"
                  ? ""
                  : "hover:border-solid hover:border-[1px] focus:border-none"
              }`}
            />
          </div>
          <div className="flex">
            <button
              className={`flex flex-row items-center font-thin text-sm px-4 py-2 mr-3 border-solid border-[1px] transition-all duration-150 rounded-full ${
                disableStartProgram || getAccessToken().activeProgram
                  ? "cursor-not-allowed bg-red-100"
                  : "hover:bg-slate-100 bg-green-100"
              }`}
              onClick={startProgramModalHandler}
              disabled={disableStartProgram || getAccessToken().activeProgram}
              title={
                disableStartProgram
                  ? "This program cannot be started because one or more of its fields are filled incorrectly."
                  : getAccessToken().activeProgram
                  ? "You already have an active program"
                  : ""
              }
            >
              <VscDebugStart /> &#160;Start Program
            </button>
            <button
              className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] transition-all duration-150 rounded-full hover:bg-slate-100"
              onClick={shareModalHandler}
            >
              <BsShare /> &#160;Share
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={handleDrop} onDragStart={handleDrag}>
          <Droppable droppableId="workouts" type="workout">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {workouts.map((workout, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={`workout-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          className={`flex flex-row items-center w-full `}
                          {...provided.draggableProps}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className={`transition-all duration-150 ${
                              drag ? "w-[53px]" : "w-0"
                            }`}
                          >
                            <MdOutlineDragHandle className="w-8 h-8 mr-5" />
                          </div>
                          <div className="flex-grow">
                            <Workout
                              workout={workout}
                              workouts={workouts}
                              update={workoutHandler}
                              delete={removeWorkout}
                              copy={duplicateWorkout}
                              move={moveWorkout}
                              index={index}
                              role={program.userRole}
                              canDelete={workouts.length > 1}
                              setDrag={setDrag}
                              drag={drag}
                              isDragging={isDragging}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {(program.userRole === "editor" || program.userRole === "owner") && (
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
    </div>
  );
};

export default ProgramView;
