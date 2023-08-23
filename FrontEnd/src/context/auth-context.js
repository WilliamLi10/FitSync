import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);
  const [status, setStatus] = useState("");

  return (
    <AuthContext.Provider
      value={{
        loginModal: loginModal,
        setLoginModal: setLoginModal,
        redirectModal: redirectModal,
        setRedirectModal: setRedirectModal,
        status: status,
        setStatus: setStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
