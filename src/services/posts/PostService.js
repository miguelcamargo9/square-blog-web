import axios from "axios";
import { sessionService } from "redux-react-session";

import { SERVER_URL } from "../../constants/server";

export const insertPostService = (postInfo) => {
  return sessionService
    .loadSession()
    .then((currentSession) => {
      const INSERT_POST_API_ENDPOINT = `${SERVER_URL}/api/posts`;

      const headers = {
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
      };

      return axios
        .post(INSERT_POST_API_ENDPOINT, postInfo, headers)
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

export const viewAllPostService = () => {
  const ALL_POST_API_ENDPOINT = `${SERVER_URL}/api/posts/desc`;

  return axios
    .get(ALL_POST_API_ENDPOINT)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const generatePostService = () => {
  const IMPORT_POST_API_ENDPOINT = `${SERVER_URL}/api/importPost`;

  return axios
    .get(IMPORT_POST_API_ENDPOINT)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
