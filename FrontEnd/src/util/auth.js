import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const checkJWT = () => {
  const jwt = Cookies.get("jwt");
  return jwt ? true : false;
};

export const getJWT = () => {
  const jwt = Cookies.get("jwt");
  if (jwt) {
    return jwt_decode(jwt);
  }
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
