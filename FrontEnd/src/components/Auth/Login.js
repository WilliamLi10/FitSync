import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { FaGooglePlusG } from "react-icons/fa";
import { getCSRF } from "../../util/auth";
import Cookies from "js-cookie";

const Login = (props) => {
  const [email, setEmail] = useState({ value: "", valid: false });
  const [pass, setPass] = useState({ value: "", valid: false });
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submit, setSubmit] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (email.valid && pass.valid) {
      getCSRF()
        .then((token) => {
          return fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": token,
            },
            body: JSON.stringify({
              email: email.value,
              pass: pass.value,
            }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              
            }
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            Cookies.set("jwt", data.token, {
              expires: 1,
              secure: true,
              sameSite: "strict",
              domain: "localhost",
              path: "/",
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    }
  };

  return (
    <form className="flex flex-col px-8 py-4 w-full items-center">
      <h2 className="font-bold text-slate-700 text-3xl text-center mt-16">
        Log In to FitSync
      </h2>
      <div className="border-solid border-[1px] w-full px-4 py-2 mt-8 mb-4 flex flex-row justify-center items-center text-sm cursor-pointer rounded-md transition-all duration-150 text-white bg-[#DB4437] hover:opacity-[87%]">
        <FaGooglePlusG className="w-5 h-5" /> &#160; Continue with Google
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
        <div className="text-sm text-gray-400 mx-2">or</div>
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
      </div>
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
        <div className="text-red-600 mt-2 w-full">Incorrect username</div>
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
      {passError && (
        <div className="text-red-600 mt-2 w-full">Incorrect password</div>
      )}
      <div className="flex flex-row text-sm w-full justify-between">
        <div className="cursor-pointer text-slate-700 underline">
          Forgot password?
        </div>
        <div
          className="cursor-pointer text-slate-700 underline"
          onClick={props.switch}
        >
          Create account
        </div>
      </div>
      <button
        className="border-solid border-[1px] w-[60%] rounded-full border-slate-700 text-sm mt-4 px-4 py-2 transition-all duration-150 mb-4 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
        onClick={submitHandler}
        type="submit"
      >
        LOG IN
      </button>
    </form>
  );
};

export default Login;
