import { useEffect, useRef, useState, useContext } from "react";
import { refreshToken } from "../../../../util/auth";
import Cookies from "js-cookie";
import AuthContext from "../../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { RiAddLine } from "react-icons/ri";
import ShareUser from "./ShareUser";

const ProgramShareModel = (props) => {
  const modalRef = useRef(null);
  const [owner, setOwner] = useState("");
  const [editors, setEditors] = useState(new Set());
  const [viewers, setViewers] = useState(new Set());
  const [username, setUsername] = useState("");
  const [editorPermissions, setEditorPersmissions] = useState(false);
  const [editorPermissionsInput, setEditorPersmissionsInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        return fetch("http://localhost:5000/program/get-users", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            programID: props.programID,
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
      .then((data) => {
        setOwner(data.owner);
        setEditors(new Set(data.editors));
        setViewers(new Set(data.viewers));
        setEditorPersmissions(data.editorPermissions);
        setEditorPersmissionsInput(data.editorPermissions);
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

  const addHandler = (event) => {
    event.preventDefault();
    refreshToken()
      .then(() => {
        return fetch("http://localhost:5000/user/search-user", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            username: username,
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
      .then((data) => {
        if (data.success) {
          const newEditors = new Set(editors);
          newEditors.add(username);
          if (newEditors.size === editors.size) {
            setError("User already added");
          } else {
            setEditors(newEditors);
            setError("");
          }
        } else {
          setError("Username does not exist");
        }
        setUsername("");
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

  const changeRole = (username, newRole) => {
    const newViewers = new Set(viewers);
    const newEditors = new Set(editors);
    if (newRole === "Editor") {
      newViewers.delete(username);
      newEditors.add(username);
    } else {
      newViewers.add(username);
      newEditors.delete(username);
    }
    setViewers(newViewers);
    setEditors(newEditors);
  };

  const saveUsers = (event) => {
    event.preventDefault();
    refreshToken()
      .then(() => {
        return fetch("http://localhost:5000/program/save-users", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            editors: [...editors],
            viewers: [...viewers],
            programID: props.programID,
          }),
        });
      })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          return response.json().then((data) => {
            throw { error: data.error, status: response.status };
          });
        }
        return response.json();
      })
      .then(() => {
        props.modalHandler(false);
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

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-col px-8 py-4 shadow-md max-h-[60%]"
    >
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <form className="flex flex-col flex-grow">
          <div>
            <h2 className="text-xl">Share "{props.title}"</h2>
            {error !== "" && (
              <p className="text-red-500 text-sm mt-3">{error}</p>
            )}
            <div
              className={`flex flex-row w-full justify-between items-center ${
                error === "" ? "mt-3" : ""
              }`}
            >
              <input
                className={`text-sm px-4 w-[82%] focus:ring-0 ${
                  error !== "" ? "border-solid border-red-500" : ""
                }`}
                type="text"
                placeholder="Search by username "
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <button
                className="flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] border-gray-400 w-[15%] transition-all duration-150 hover:bg-slate-100"
                onClick={addHandler}
                type="button"
              >
                <RiAddLine /> &#160;Add
              </button>
            </div>
            <h2 className="mt-2 font-semibold">People with access</h2>
          </div>
          <div className="overflow-y-auto max-h-[420px]">
            <ShareUser type="owner" name={owner} />
            {[...editors].map((editor) => {
              if (editor != owner) {
                return (
                  <ShareUser
                    type="editor"
                    name={editor}
                    role={props.role}
                    editPermission={editorPermissions}
                    changeRole={changeRole}
                  />
                );
              }
            })}
            {[...viewers].map((viewer) => {
              return (
                <ShareUser
                  type="viewer"
                  name={viewer}
                  role={props.role}
                  editPermission={editorPermissions}
                  changeRole={changeRole}
                />
              );
            })}
          </div>
          <div className="pt-1">
            {props.role === "owner" && (
              <div className="flex flex-row items-center text-sm mb-2">
                <input
                  type="checkbox"
                  checked={editorPermissionsInput}
                  onChange={() => {
                    setEditorPersmissionsInput(
                      (prevEditorPermissionsInput) =>
                        !prevEditorPermissionsInput
                    );
                  }}
                  className="h-3 w-3 rounded-full text-slate-700 focus:ring-0"
                />
                <label>
                  &#160;Allow editors to share and change permissions
                </label>
              </div>
            )}
            <div className="flex flex-row justify-between">
              <button className="flex flex-row items-center rounded-full font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] border-gray-400 transition-all duration-150 hover:bg-slate-100">
                <AiOutlineLink />
                &#160;Copy link
              </button>
              <button
                className="flex flex-row items-center rounded-full font-thin bg-slate-700 text-sm px-4 py-2 text-white border-solid border-[1px] border-gray-400 transition-all duration-15 hover:bg-white hover:text-black"
                type="submit"
                onClick={saveUsers}
              >
                Done
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProgramShareModel;
