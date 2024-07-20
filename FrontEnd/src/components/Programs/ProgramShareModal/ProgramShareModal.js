import { useEffect, useRef, useState, useContext } from "react";
import { refreshToken } from "../../../util/auth";
import Cookies from "js-cookie";
import AuthContext from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import ShareUser from "./ShareUser";

const ProgramShareModel = (props) => {
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
        return fetch(`${process.env.REACT_APP_API_URL}/program/get-permissions?programID=${props.programID}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
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
        setIsPublicInput(data.isPublic);
        setEditorPermissions(data.editorPermissions);
        setEditorPermissionsInput(data.editorPermissions);
      })
      .catch((error) => {
        if (error.response === 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.reload();
          ctx.setLoginModal({type: "login"});
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
        return fetch(`${process.env.REACT_APP_API_URL}/user/search-user?username=${username}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
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
          ctx.setLoginModal({type: "login"});
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

  const savePermissions = (event) => {
    event.preventDefault();
    refreshToken()
      .then(() => {
        return fetch(`${process.env.REACT_APP_API_URL}/program/save-permissions?programID=${props.programID}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            editors: [...editors],
            viewers: [...viewers],
            editorPermissions: editorPermissionsInput,
            isPublic: isPublicInput,
            programID: props.programID,
          }),
        });
      })
      .then((response) => {
        console.log(response);
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
          ctx.setLoginModal({type: "login"});
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
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white flex flex-col px-9 py-7 shadow-md w-[60%] min-w-[500px] max-w-[700px]"
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
                className={`text-sm px-4 my-2 w-[82%] focus:ring-0 ${
                  error !== "" ? "border-solid border-red-500" : ""
                } ${
                  props.role === "owner" ||
                  (props.role === "editor" && editorPermissions)
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                type="text"
                placeholder="Search by username"
                value={username}
                disabled={
                  props.role === "viewer" ||
                  (props.role === "editor" && !editorPermissions)
                }
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <button
                className={`flex flex-row items-center font-thin text-sm px-4 py-2 bg-white border-solid border-[1px] border-gray-400 w-[15%] transition-all duration-150 hover:bg-slate-100 justify-center ${
                  props.role === "owner" ||
                  (props.role === "editor" && editorPermissions)
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={addHandler}
                disabled={
                  props.role === "viewer" ||
                  (props.role === "editor" && !editorPermissions)
                }
                type="button"
              >
                <RiAddLine /> &#160;Add
              </button>
            </div>
          <h2 className="mt-2 font-semibold">People with access</h2>
          </div>
          <div className="overflow-y-auto max-h-[250px]">
            <ShareUser type="owner" name={owner} />
            {[...editors].map((editor) => {
              if (editor !== owner) {
                return (
                  <ShareUser
                    type="editor"
                    key={editor}
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
                  key={viewer}
                  name={viewer}
                  role={props.role}
                  editPermission={editorPermissions}
                  changeRole={changeRole}
                />
              );
            })}
          </div>
          {props.role === "owner" ||
          (props.role === "editor" && editorPermissions) ? (
            <div className="pt-3 mb-3">
              {props.role === "owner" && (
                <div className="mb-6">
                  <div className="flex flex-row items-center text-sm mb-3">
                    <input
                      type="checkbox"
                      checked={editorPermissionsInput}
                      onChange={() => {
                        setEditorPermissionsInput(
                          (prevEditorPermissionsInput) => !prevEditorPermissionsInput
                        );
                      }}
                      className="h-3 w-3 rounded-full text-slate-700 focus:ring-0"
                    />
                    <label>
                      &#160;Allow editors to share and change permissions
                    </label>
                  </div>
                  <div className="flex flex-row items-center text-sm">
                    <input
                      type="checkbox"
                      checked={isPublicInput}
                      onChange={() => {
                        setIsPublicInput(
                          (prevIsPublicInput) => !prevIsPublicInput
                        );
                      }}
                      className="h-3 w-3 rounded-full text-slate-700 focus:ring-0"
                    />
                    <label>&#160;Make program public</label>
                  </div>
                  <p className="text-[.75rem] text-gray-400 font-thin mb-2 ml-4">
                    Public programs can be found in Discover Programs and can be
                    viewed by anyone. Private programs can only be viewed by
                    invited users.
                  </p>
                </div>
              )}
              <button
                className="flex flex-row items-center rounded-full mx-auto w-[80%] bg-white px-4 py-2 text-slate-700 border-solid border-[1px] border-slate-700 justify-center transition-all duration-150 hover:bg-slate-700 hover:text-white"
                type="submit"
                onClick={savePermissions}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-400 font-thin my-2 w-full text-center">
              You do not have permission to share
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ProgramShareModel;
