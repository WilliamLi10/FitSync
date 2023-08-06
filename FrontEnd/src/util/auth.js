import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const checkAccess = () => {
  const jwt = Cookies.get("accessJWT");
  return jwt ? true : false;
};

export const getAccess = () => {
  const jwt = Cookies.get("accessJWT");
  if (jwt) {
    return jwt_decode(jwt);
  }
};

export const checkRefresh = () => {
  const accessJWT = Cookies.get("accessJWT");
  const refreshJWT = Cookies.get("refreshJWT");

  const isAccessExpired = accessJWT
    ? new Date().getTime() > jwt_decode(accessJWT).exp * 1000
    : true;
  const isRefreshExpired = refreshJWT
    ? new Date().getTime() > jwt_decode(refreshJWT).exp * 1000
    : true;

  console.log(isAccessExpired, isRefreshExpired)

  if (isAccessExpired && !isRefreshExpired) {
    return fetch("http://localhost:5000/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshJWT,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            Cookies.remove("accessJWT");
            Cookies.remove("refreshJWT");
            return false;
          }
          return response.json().then((data) => {
            throw data.error;
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data === false) {
          return false;
        }
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        Cookies.set("accessJWT", data.accessToken, {
          expires: expirationDate,
          secure: true,
          sameSite: "strict",
          domain: "localhost",
          path: "/",
        });

        return true;
      })
      .catch((error) => {
        throw `${error}`;
      });
  } else if (isAccessExpired && isRefreshExpired) {
    Cookies.remove("accessJWT");
    Cookies.remove("refreshJWT");
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

export const getCSRF = () => {
  return fetch("http://localhost:5000/auth/get-csrf", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw data.error;
        });
      }
      return response.json();
    })
    .then((data) => {
      return data.token;
    })
    .catch((error) => {
      throw `${error}`;
    });
};
