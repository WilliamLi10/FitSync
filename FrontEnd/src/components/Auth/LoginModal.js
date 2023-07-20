import { useRef, useEffect, useContext } from "react";
import Login from "./Login";
import AuthContext from "../../context/auth-context";

const LoginModal = () => {
  const modalRef = useRef(null);
  const ctx = useContext(AuthContext);

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
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[80%] min-w-[800px] flex flex-row shadow-md"
    >
      <div className="w-[50%] bg-slate-700"></div>
      <Login />
    </div>
  );
};

export default LoginModal;
