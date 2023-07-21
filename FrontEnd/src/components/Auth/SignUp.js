import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { FaGooglePlusG } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

const SignUp = (props) => {
  return (
    <form className="flex flex-col px-8 py-4 w-full items-center">
      <h2 className="font-bold text-slate-700 text-3xl text-center mt-16">
        Create Account
      </h2>
      <div className="border-solid border-[1px] w-full px-4 py-2 mt-8 flex flex-row justify-center items-center text-sm cursor-pointer rounded-md transition-all duration-150 text-white bg-[#DB4437] hover:opacity-[87%]">
        <FaGooglePlusG className="w-5 h-5" /> &#160; Continue with Google
      </div>
      <div className="w-full flex flex-row items-center justify-center mt-4">
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
        <div className="text-sm text-gray-400 mx-2">or</div>
        <div className="border-solid border-t-[1px] flex-grow text-gray-400" />
      </div>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4">
        <BsPerson className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Name"
          type="text"
        />
      </div>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4">
        <HiOutlineMail className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Email"
          type="email"
        />
      </div>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4 mb-4">
        <BiLockAlt className="text-[#808080]" />
        <input
          className="pl-2 bg-slate-100 w-full border-none focus:outline-none focus:ring-0"
          placeholder="Password"
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
      <button className="border-solid border-[1px] text-sm mt-4 px-4 py-2 transition-all duration-150 mb-4 w-[60%] rounded-full border-slate-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white">
        SIGN UP
      </button>
    </form>
  );
};

export default SignUp;
