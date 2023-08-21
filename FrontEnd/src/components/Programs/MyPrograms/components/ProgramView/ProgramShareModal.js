import { useEffect, useRef, useState, useContext } from "react";
import { refreshToken } from "../../../../../util/auth";
import Cookies from "js-cookie";
import AuthContext from "../../../../../context/auth-context";
import { useNavigate } from "react-router-dom";

const ProgramShareModel = (props) => {
  const modalRef = useRef(null);
  const [owner, setOwner] = useState({});
  const [editors, setEditors] = useState(new Set());
  const [viewers, setViewers] = useState(new Set());
  const [username, setUsername] = useState("");
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
  }, []);

  const addHandler = (event) => {
    event.preventDefault();
    refreshToken()
      .then(() => {
        return fetch("http://localhost:5000/user/check-user", {
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
        console.log(response)
        if (!response.ok) {
          return response.json().then((data) => {
            throw { error: data.error, status: response.status };
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.success) {
          setEditors(new Set([...editors, username]))
          console.log(editors)
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
  };

  return (
    <form
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-col px-8 py-4 shadow-md"
    >
      <h2 className="text-xl">Share "{props.title}"</h2>
      <div className="flex flex-row w-full justify-between items-center mt-3">
        <input
          className="text-sm px-4 w-[81%] focus:ring-0"
          type="text"
          placeholder="Search by username "
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button
          className="w-[17%] text-sm font-thin bg-slate-700 text-white py-2 border-[1px] border-solid border-slate-700 transitiona-all duration-150 hover:bg-white hover:text-slate-700"
          onClick={addHandler}
        >
          Add
        </button>
      </div>
      <h2>People with access</h2>
      <div>
        <p>{owner.username}</p>
      </div>
      {[...editors].map((editor) => {
        if (editor._id !== owner._id) {
          return <div key={editor._id}>{editor.username}</div>;
        }
      })}
      {[...viewers].map((viewer) => {
        return <div key={viewer._id}>{viewer.username}</div>;
      })}
    </form>
  );
};

export default ProgramShareModel;
