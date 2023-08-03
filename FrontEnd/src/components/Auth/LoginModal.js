import { useRef, useEffect, useContext, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import AuthContext from "../../context/auth-context";

const LoginModal = () => {
  const modalRef = useRef(null);
  const ctx = useContext(AuthContext);
  const [login, setLogin] = useState(true);

  const loginHandler = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        ctx.setLoginModal(false);
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
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-row shadow-md"
    >
      {login ? (
        <Login switch={loginHandler} />
      ) : (
        <SignUp switch={loginHandler} />
      )}
    </div>
  );
};

export default LoginModal;
