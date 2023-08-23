import { useContext, useState, useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import ProgramList from "./ProgramList/ProgramList";
import { refreshToken } from "../../../util/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../../../context/auth-context";
import debounce from 'lodash.debounce';

const MyPrograms = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const createProgram = () => {
    refreshToken()
      .then(() => {
        return fetch("http://localhost:5000/program/create-program", {
          method: "POST",
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
        navigate(`/programs/myprograms/${data.programID}`);
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

  const loadProgramList = () => {
    setIsLoading(true);
    refreshToken()
      .then(() => {
        return fetch("http://localhost:5000/program/load-program-list", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({ index: index }),
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
          setPrograms((prevPrograms) => prevPrograms.concat(data.programs));
          setIndex((prevIndex) => prevIndex + 20);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const debouncedLoadProgramList = debounce(loadProgramList, 300);

  useEffect(() => {
    loadProgramList();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    debouncedLoadProgramList();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="bg-gray-50 w-full h-full px-5 py-5">
      <div>
        <button
          className="flex flex-row items-center text-sm font-thin bg-white rounded-md shadow-sm px-4 py-2 mb-5 border-solid border-[1px] transition-all duration-300 hover:bg-gray-50"
          onClick={createProgram}
        >
          <RiAddLine /> &#160;Create New Program
        </button>
        {programs.length !== 0 && <ProgramList programs={programs} />}
      </div>
    </div>
  );
};

export default MyPrograms;