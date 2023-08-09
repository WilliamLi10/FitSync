import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const useTokenRefresh = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const accessJWT = Cookies.get("accessToken");
  const refreshJWT = Cookies.get("refreshToken");

  const isAccessExpired = accessJWT
    ? new Date().getTime() > jwt_decode(accessJWT).exp * 1000
    : true;
  const isRefreshExpired = refreshJWT
    ? new Date().getTime() > jwt_decode(refreshJWT).exp * 1000
    : true;

  if (isAccessExpired && !isRefreshExpired) {
    return fetch("http://localhost:5000/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-refresh-token": refreshJWT,
      },
      body: JSON.stringify({
        refreshToken: refreshJWT,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.reload();
            ctx.setLoginModal(true);
            ctx.setStatus("Session timed out: You have been logged out");
            throw "";
          }
          return response.json().then((data) => {
            navigate("/error", {
              state: { error: data.error, status: response.status },
            });
            throw "";
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const expirationDate15Min = new Date();
          expirationDate15Min.setMinutes(expirationDate15Min.getMinutes() + 15);

          Cookies.set("accessToken", data.accessToken, {
            expires: expirationDate15Min,
            secure: true,
            sameSite: "strict",
            domain: "localhost",
            path: "/",
          });

          const expirationDate1Hour = new Date();
          expirationDate1Hour.setHours(expirationDate1Hour.getHours() + 1);

          Cookies.set("refreshToken", data.refreshToken, {
            expires: expirationDate1Hour,
            secure: true,
            sameSite: "strict",
            domain: "localhost",
            path: "/",
          });
        }
      })
      .catch((error) => {
        throw `${error}`;
      });
  } else if (isAccessExpired && isRefreshExpired) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.reload();
    ctx.setLoginModal(true);
    ctx.setStatus("Session timed out: You have been logged out");
    return Promise.resolve("");
  }
  return Promise.resolve("");
};

export default useTokenRefresh;
