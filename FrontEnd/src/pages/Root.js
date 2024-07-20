import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import TopBar from "../components/TopBar/TopBar";
import LoginModal from "../components/Auth/LoginModal";
import SignUpRedirect from "../components/Auth/SignUpRedirect";
import AuthContext from "../context/auth-context";
import StatusBanner from "../components/StatusBanner";

const Root = () => {
  const ctx = useContext(AuthContext);

  return (
    <div className="h-screen">
      <TopBar />
      {ctx.status && (
        <StatusBanner msg={ctx.status} closeHandler={() => {ctx.setStatus("")}}/>
      )}
      <div className="pt-16">
        <Outlet />
        {ctx.loginModal.isOpen && <LoginModal />}
        {ctx.loginModal.isOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
        )}
        {ctx.redirectModal && <SignUpRedirect />}
        {ctx.redirectModal && (
          <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
        )}
      </div>
    </div>
  );
};

export default Root;
