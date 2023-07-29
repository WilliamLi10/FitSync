import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loginModal, setLoginModal] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        loginModal: loginModal,
        setLoginModal: setLoginModal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
