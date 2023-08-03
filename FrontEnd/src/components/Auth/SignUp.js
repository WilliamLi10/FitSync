import { useState, useContext } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { FaGooglePlusG } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { getCSRF } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const SignUp = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({ value: "", valid: false });
  const [dob, setDob] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });
  const [pass, setPass] = useState({ value: "", valid: false });
  const [submit, setSubmit] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmit(true);

    if (user.valid && dob.valid && email.valid && pass.valid) {
      getCSRF()
        .then((token) => {
          return fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": token,
            },
            body: JSON.stringify({
              user: user.value,
              dob: dob.value,
              email: email.value,
              pass: pass.value,
            }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 409) {
              return response.json().then((data) => {
                setEmailError(data.email);
                setEmail({ ...email, valid: !data.email });
                setUserError(data.user);
                setUser({ ...user, valid: !data.user });
                throw "";
              });
            } else {
              return response.json().then((data) => {
                navigate("/error", {
                  state: { error: data.error, status: response.status },
                });
                throw "";
              });
            }
          }
          return response.json();
        })
        .then((data) => {
          ctx.setLoginModal(false);
          ctx.setRedirectModal(true);
        })
        .catch((error) => {
          if (`${error}` !== "") {
            navigate("/error", {
              state: { error: `${error}`, status: 500 },
            });
          }
        });
    }
  };

  return (
    <form className="flex flex-col px-8 py-4 w-full items-center">
      <h2 className="font-bold text-slate-700 text-3xl text-center mt-16">
        Create an Account
      </h2>
      <button className="border-solid border-[1px] w-full px-4 py-2 mt-8 mb-4 flex flex-row justify-center items-center text-sm cursor-pointer rounded-md transition-all duration-150 text-white bg-[#DB4437] hover:opacity-[87%]">
        <FaGooglePlusG className="w-5 h-5" /> &#160; Continue with Google
      </button>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
        <div className="text-sm text-gray-400 mx-2">or</div>
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
      </div>
      <div className="w-full flex flex-row justify-between mt-4">
        <div
          className={`flex flex-row items-center bg-slate-100 w-[47.5%] px-4 py-2 ${
            submit && !user.valid && "border-solid border-[1px] border-red-600"
          }`}
        >
          <BsPerson className="text-[#808080]" />
          <input
            className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
            placeholder="Username"
            value={user.value}
            onChange={(event) => {
              setUser({
                value: event.target.value,
                valid: event.target.value !== "" && event.target.value !== null,
              });
            }}
            type="text"
          />
        </div>
        <div
          className={`flex flex-row items-center bg-slate-100 w-[47.5%] px-4 py-2 ${
            submit && !dob.valid && "border-solid border-[1px] border-red-600"
          }`}
        >
          <input
            className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
            value={dob.value}
            onChange={(event) => {
              setDob({
                value: event.target.value,
                valid: event.target.value !== "" && event.target.value !== null,
              });
            }}
            type="date"
          />
        </div>
      </div>
      {userError && (
        <div className="text-red-600 mt-2 w-full">Username already exists</div>
      )}
      <div
        className={`flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4 ${
          submit && !email.valid && "border-solid border-[1px] border-red-600"
        }`}
      >
        <HiOutlineMail className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Email"
          value={email.value}
          onChange={(event) => {
            setEmail({
              value: event.target.value,
              valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value),
            });
          }}
          type="email"
        />
      </div>
      {emailError && (
        <div className="text-red-600 w-full mt-2">Email already exists.</div>
      )}
      <div
        className={`flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4 mb-4 ${
          submit && !pass.valid && "border-solid border-[1px] border-red-600"
        }`}
      >
        <BiLockAlt className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Password"
          value={pass.value}
          onChange={(event) => {
            setPass({
              value: event.target.value,
              valid: event.target.value !== "" && event.target.value !== null,
            });
          }}
          type="password"
        />
      </div>
      <div className="flex flex-row text-sm">
        <div>Already have an account?&#160;</div>
        <a
          className="cursor-pointer text-slate-700 underline"
          onClick={props.switch}
        >
          Log In
        </a>
      </div>
      <button
        className="border-solid border-[1px] w-[60%] rounded-full border-slate-700 text-sm mt-4 px-4 py-2 transition-all duration-150 mb-4 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
        onClick={submitHandler}
        type="submit"
      >
        SIGN UP
      </button>
    </form>
  );
};

export default SignUp;
