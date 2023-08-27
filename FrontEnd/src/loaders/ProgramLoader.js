import Cookies from "js-cookie";
import { refreshToken } from "../util/auth.js";

export const programLoader = ({ params }) => {
  return refreshToken()
    .then(() => {
      return fetch(`http://localhost:5000/program/load-program?programID=${params.programID}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
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
      return data.program;
    })
    .catch((error) => {
      return error
    });
};
