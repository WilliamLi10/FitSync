import Cookies from "js-cookie";
import { refreshToken } from "../../../../util/auth";

export const programViewLoader = ({ params }) => {
  return refreshToken()
    .then(() => {
      return fetch("http://localhost:5000/program/load-program", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          programID: params.programID,
        }),
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
      return error;
    });
};
