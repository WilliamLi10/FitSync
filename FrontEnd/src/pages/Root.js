import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import TopBar from "../components/TopBar/TopBar";
import LoginModal from "../components/Auth/LoginModal";
import SignUpRedirect from "../components/Auth/SignUpRedirect";
import AuthContext from "../context/auth-context";
import StatusBanner from "../components/StatusBanner";

const Root = () => {
  const ctx = useContext(AuthContext);
  const [loginModal, setLoginModal] = useState(ctx.loginModal);
  const [redirectModal, setRedirectModal] = useState(ctx.redirectModal);
  const [status, setStatus] = useState(ctx.status);

  useEffect(() => {
    setLoginModal(ctx.loginModal);
  }, [ctx.loginModal]);

  useEffect(() => {
    setRedirectModal(ctx.redirectModal);
  }, [ctx.redirectModal]);

  useEffect(() => {
    setStatus(ctx.status);
  }, [ctx.status]);

  const statusCloseHandler = () => {
    ctx.setStatus("");
  };

  return (
    <div>
      <TopBar />
      {status && (
        <StatusBanner msg={status} closeHandler={statusCloseHandler} />
      )}
      <div className="pt-16">
        <Outlet />
        {loginModal && <LoginModal />}
        {loginModal && (
          <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
        )}
        {redirectModal && <SignUpRedirect />}
        {redirectModal && (
          <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
        )}
      </div>
    </div>
  );
};

export default Root;
