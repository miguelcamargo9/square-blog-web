import axios from "axios";
import { sessionService } from "redux-react-session";

import { SERVER_URL } from "../../constants/server";

export const loginUserService = (dataUser, history) => {
  const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/login`;

  return axios
    .post(LOGIN_API_ENDPOINT, dataUser)
    .then((response) => {
      const { access_token, user } = response.data;
      sessionService
        .saveSession({ access_token })
        .then(() => {
          sessionService
            .saveUser(user)
            .then(() => {
              history.push("/admin/home");
            })
            .catch((err) => console.error("save user", err));
        })
        .catch((err) => console.error("save error", err));
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const logoutUserService = () => {
  return sessionService
    .loadSession()
    .then((currentSession) => {
      const LOGIN_API_ENDPOINT = `${SERVER_URL}/api/logout`;

      const data = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
      };

      return axios
        .post(LOGIN_API_ENDPOINT, null, data)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    })
    .catch((err) => console.log(err));
};

export const insertUserService = (dataUser) => {
  const REGISTER_API_ENDPOINT = `${SERVER_URL}/api/register`;

  return axios
    .post(REGISTER_API_ENDPOINT, dataUser)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
