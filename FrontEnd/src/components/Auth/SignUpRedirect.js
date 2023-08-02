import { useContext, useEffect, useRef } from "react";
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

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-col shadow-md "
    >
      <div className="">Account has been created!</div>
      <button>Go to Log In</button>
    </div>
  );
};

export default SignUpRedirect;
