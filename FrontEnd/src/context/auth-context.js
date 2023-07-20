import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        loginModal: loginModal,
        setLoginModal: setLoginModal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
