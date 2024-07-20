import { useContext, useEffect, useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import AuthContext from "../../context/auth-context";

const SignUpRedirect = () => {
  const ctx = useContext(AuthContext);
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        ctx.setRedirectModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  const redirectHandler = () => {
    ctx.setRedirectModal(false);
    ctx.setLoginModal({type: "login"});
  };

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-col shadow-md items-center"
    >
      <div className="text-center text-2xl font-bold mt-10 mb-5">
        Account has been created!
      </div>
      <AiFillCheckCircle className="text-green-500 w-24 h-24" />
      <button
        className="text-white bg-slate-700 mt-5 mb-7 px-10 py-2 font-thin transition-all duration-150 hover:bg-slate-600"
        onClick={redirectHandler}
      >
        Log In Now
      </button>
    </div>
  );
};

export default SignUpRedirect;
