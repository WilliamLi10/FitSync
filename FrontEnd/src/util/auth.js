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