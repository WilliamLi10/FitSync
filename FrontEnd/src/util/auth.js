import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
export const checkAccessToken = () => {
  const jwt = Cookies.get("accessToken");
  return jwt ? true : false;
};

export const getAccessToken = () => {
  const jwt = Cookies.get("accessToken");
  if (jwt) {
    
    return jwt_decode(jwt);
  }
};

export const refreshToken = () => {
  const accessJWT = Cookies.get("accessToken");
  const refreshJWT = Cookies.get("refreshToken");

  const isAccessExpired = accessJWT
    ? new Date().getTime() > jwt_decode(accessJWT).exp * 1000
    : true;
  const isRefreshExpired = refreshJWT
    ? new Date().getTime() > jwt_decode(refreshJWT).exp * 1000
    : true;

  if (isAccessExpired && !isRefreshExpired) {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
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
          return response.json().then((data) => {
            throw { error: data.error, status: response.status };
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
        throw { error: error.error, status: error.status };
      });
  } else if (isAccessExpired && isRefreshExpired) {
    throw { error: "Unauthorized", status: 401 };
  }
  return Promise.resolve("");
};
