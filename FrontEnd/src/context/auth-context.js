import { createContext, useState, useReducer } from "react";

const AuthContext = createContext();

const loginModalReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isOpen: true,
        isLogin: true
      }
    case "signup":
      return {
        isOpen: true,
        isLogin: false
      }
    case "close":
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}

export const AuthContextProvider = (props) => {
  const [loginModal, setLoginModal] = useReducer(loginModalReducer, {
    isOpen: false,
    isLogin: true
  })
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
