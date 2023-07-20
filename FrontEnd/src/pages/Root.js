import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import TopBar from "../components/TopBar/TopBar";
import LoginModal from "../components/Auth/LoginModal";
import AuthContext from "../context/auth-context";

const Root = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
  });

  const ctx = useContext(AuthContext);
  const [loginModal, setLoginModal] = useState(ctx.loginModal);

  useEffect(() => {
    setLoginModal(ctx.loginModal);
  }, [ctx.loginModal]);

  return (
    <div>
      <TopBar UserInfo={user} />
      <div>
        <Outlet />
        {loginModal && <LoginModal />}
        {loginModal && (
          <div className="fixed top-0 left-0 w-full h-full z-[1] pointer-events-auto bg-black opacity-[15%]" />
        )}
      </div>
    </div>
  );
};

export default Root;
