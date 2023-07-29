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
        throw new Error("CSRF token no response.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.token);
      return data.token;
    })
    .catch((error) => {
      console.error("Error retrieving CSRF token:", error);
    });
};
