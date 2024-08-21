import Cookies from "js-cookie";
import { refreshToken } from "../util/auth.js";
import moment from "moment";

export const workoutLoader = ({ params }) => {
  const date = moment(params.date ? params.date : moment()).format(
    "YYYY-MM-DDTHH:mm:ssZ"
  );

  return refreshToken()
    .then(() => {
      return fetch(
        `${process.env.REACT_APP_API_URL}/workout/get-workouts?startDate=${date}&endDate=${date}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
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
      return data;
    })
    .catch((error) => {
      return error;
    });
};
