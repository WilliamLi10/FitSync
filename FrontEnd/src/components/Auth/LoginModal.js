import { useRef, useEffect, useContext, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import AuthContext from "../../context/auth-context";

const LoginModal = () => {
  const modalRef = useRef(null);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        ctx.setLoginModal({type: "close"});
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  const modalSwitch = () => {
    if (ctx.loginModal.isLogin) {
      ctx.setLoginModal({type: "signup"})
    } else {
      ctx.setLoginModal({type: "login"})
    }
  }

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-row shadow-md"
    >
      {ctx.loginModal.isLogin ? (
        <Login switch={modalSwitch} />
      ) : (
        <SignUp switch={modalSwitch} />
      )}
    </div>
  );
};

export default LoginModal;
