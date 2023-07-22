import { useReducer } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { FaGooglePlusG } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

const signUpReducer = (state, action) => {
  switch (action.type) {
    case "fname":
      return {
        ...state,
        fname: {
          value: action.value,
          valid: /^[A-Za-z\s]+$/.test(action.value.trim()),
        },
        valid: state.valid && /^[A-Za-z\s]+$/.test(action.value.trim()),
      };
    case "lname":
      return {
        ...state,
        lname: {
          value: action.value,
          valid: /^[A-Za-z\s]+$/.test(action.value.trim()),
        },
        valid: state.valid && /^[A-Za-z\s]+$/.test(action.value.trim()),
      };
    case "dob":
      return {
        ...state,
        dob: {
          value: action.value,
          valid: action.value !== "" && action.value !== null,
        },
        valid: state.valid && action.value !== "" && action.value !== null,
      };
    case "email":
      return {
        ...state,
        email: {
          value: action.value,
          valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.value),
        },
        valid: state.valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.value),
      };
    case "pass":
      return {
        ...state,
        pass: { value: action.value, valid: action.value !== "" },
        valid: state.valid && action.value !== "",
      };

    default:
      return state;
  }
};

const SignUp = (props) => {
  const [signUp, setSignUp] = useReducer(signUpReducer, {
    fname: { value: "", valid: false },
    lname: { value: "", valid: false },
    dob: { value: "", valid: false },
    email: { value: "", valid: false },
    pass: { value: "", valid: false },
    valid: false,
  });

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className="flex flex-col px-8 py-4 w-full items-center">
      <h2 className="font-bold text-slate-700 text-3xl text-center mt-16">
        Create an Account
      </h2>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row items-center bg-slate-100 w-[32%] px-4 py-2 mt-8">
          <BsPerson className="text-[#808080]" />
          <input
            className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
            placeholder="First Name"
            value={signUp.fname.value}
            onChange={(event) => {
              setSignUp({ type: "fname", value: event.target.value });
            }}
            type="text"
          />
        </div>
        <div className="flex flex-row items-center bg-slate-100 w-[32%] px-4 py-2 mt-8">
          <BsPerson className="text-[#808080]" />
          <input
            className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
            placeholder="Last Name"
            value={signUp.lname.value}
            onChange={(event) => {
              setSignUp({ type: "lname", value: event.target.value });
            }}
            type="text"
          />
        </div>
        <div className="flex flex-row items-center bg-slate-100 w-[32%] px-4 py-2 mt-8">
          <input
            className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
            value={signUp.dob.value}
            onChange={(event) => {
              setSignUp({ type: "dob", value: event.target.value });
            }}
            type="date"
          />
        </div>
      </div>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4">
        <HiOutlineMail className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Email"
          value={signUp.email.value}
          onChange={(event) => {
            setSignUp({ type: "email", value: event.target.value });
          }}
          type="email"
        />
      </div>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4 mb-4">
        <BiLockAlt className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Password"
          value={signUp.pass.value}
          onChange={(event) => {
            setSignUp({ type: "pass", value: event.target.value });
          }}
          type="password"
        />
      </div>
      <div className="flex flex-row text-sm">
        <div>Already have an account?&#160;</div>
        <div
          className="cursor-pointer text-slate-700 underline"
          onClick={props.switch}
        >
          Log In
        </div>
      </div>
      <button
        className="border-solid border-[1px] w-[60%] rounded-full border-slate-700 text-sm mt-4 px-4 py-2 transition-all duration-150 mb-4 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
        onClick={submitHandler}
        type="submit"
      >
        SIGN UP
      </button>
      <div className="w-full flex flex-row items-center justify-center mt-2">
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
        <div className="text-sm text-gray-400 mx-2">or</div>
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
      </div>
      <div className="border-solid border-[1px] w-full px-4 py-2 mt-4 mb-8 flex flex-row justify-center items-center text-sm cursor-pointer rounded-md transition-all duration-150 text-white bg-[#DB4437] hover:opacity-[87%]">
        <FaGooglePlusG className="w-5 h-5" /> &#160; Continue with Google
      </div>
    </form>
  );
};

export default SignUp;
