import { HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { FaGooglePlusG } from "react-icons/fa";

const Login = () => {
  return (
    <form className="flex flex-col px-8 py-4 w-[50%] items-center">
      <h2 className="font-bold text-slate-700 text-3xl text-center mt-16">
        Log In
      </h2>
      <div className="border-solid border-[1px] w-full px-4 py-2 mt-4 flex flex-row justify-center items-center text-sm cursor-pointer rounded-md transition-all duration-150 hover:shadow-lg">
        <FaGooglePlusG className="w-5 h-5"/> &#160; Log in with Google
      </div>
      <p className="text-sm text-gray-400 mt-4">or sign in with Email</p>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4">
        <HiOutlineMail className="text-[#808080]" />
        <input className="pl-2 bg-slate-100" placeholder="Email" />
      </div>
      <div className="flex flex-row items-center bg-slate-100 w-full px-4 py-2 mt-4">
        <BiLockAlt className="text-[#808080]" />
        <input className="pl-2 bg-slate-100" placeholder="Password" />
      </div>
      <button className="border-solid border-[1px] text-sm mt-4 px-4 py-2 transition-all duration-150 hover:border-slate-700 hover:bg-slate-700 hover:text-white">
        LOG IN
      </button>
    </form>
  );
};

export default Login;
