import { useEffect, useRef, useState, useContext } from "react";
import { refreshToken } from "../../../../util/auth";
import Cookies from "js-cookie";
import AuthContext from "../../../../context/auth-context";
import { useNavigate } from "react-router-dom";

const StartProgramModal = (props) => {
  const modalRef = useRef(null);
  const [owner, setOwner] = useState("");
  const [editors, setEditors] = useState(new Set());
  const [viewers, setViewers] = useState(new Set());
  const [username, setUsername] = useState("");
  const [editorPermissions, setEditorPermissions] = useState(
    props.editPermissions
  );
  const [editorPermissionsInput, setEditorPermissionsInput] = useState(
    props.editPermissions
  );
  const [isPublicInput, setIsPublicInput] = useState(props.isPublic);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [workoutDays, setWorkoutDays] = useState([
    {
      day: "Sun",
      workoutName: "",
    },
    {
      day: "Mon",
      workoutName: "",
    },
    {
      day: "Tues",
      workoutName: "",
    },
    {
      day: "Wed",
      workoutName: "",
    },
    {
      day: "Mon",
      workoutName: "",
    },
    {
      day: "Thurs",
      workoutName: "",
    },
    {
      day: "Fri",
      workoutName: "",
    },
    {
      day: "Sat",
      workoutName: "",
    },
  ]);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    setLoading(true);
    refreshToken()
      .then(() => {
        return fetch(
          `http://localhost:5000/program/get-permissions?programID=${props.programID}`,
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
        console.log(data);
        setOwner(data.owner);
        setEditors(new Set(data.editors));
        setViewers(new Set(data.viewers));
        setIsPublicInput(data.isPublic);
        setEditorPermissions(data.editorPermissions);
        setEditorPermissionsInput(data.editorPermissions);
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
      })
      .finally(setLoading(false));
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white flex flex-col px-9 py-7 shadow-md w-[60%] min-w-[500px] max-w-[700px]"
    >
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <div className="flex flex-col flex-grow gap-4">
          <h2 className="text-xl">Start "{props.title}"</h2>
          <div className = "flex flex-row gap-20">
            <div class="flex flex-col items-start">
              <label for="startDate" class="mb-2">
                Start Date:
              </label>
              <input
                type="text"
                name="startDate"
                className="border-gray border border-solid rounded-2xl w-30 h-8"
                onChange = {event => {setStartDate(event.target.value);}}
              ></input>
            </div>
            <div class="flex flex-col items-start">
              <label for="startDate" class="mb-2">
                Duration (#Weeks):
              </label>
              <input
                type="text"
                name="startDate"
                className="border-gray border border-solid rounded-2xl w-30 h-8"
              ></input>
            </div>
          </div>
          <div className="flex justify-center flex-grow">
            {workoutDays.map((day) => {
              return (
                <div
                  className={`w-[14.28%] h-full my-2 border-gray border-solid ${
                    day.day !== "Sat" ? "border-r-[1px]" : ""
                  }`}
                >
                  <div className="h-10 text-center border-b-[1px] border-gray border-solid">
                    <div className={"text-1xl font-light text-gray-500"}>
                      {day.day.toUpperCase()}
                    </div>
                  </div>
                  <div className="h-[90%]"></div>
                </div>
              );
            })}
          </div>
          <div>
            <button >Start Program</button>
             </div>
        </div>
      )}
    </div>
  );
};

export default StartProgramModal;
