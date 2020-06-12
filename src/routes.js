import { sessionService } from "redux-react-session";

import { adminRoutes, bloggerRoutes, defaultRoutes } from "./routes/";

export const getAllRoutes = () => {
  return sessionService
    .loadUser()
    .then((user) => {
      const profile = Number.parseInt(user.profile_id, 10);

      let dashRoutes = [];

      if (profile) {
        switch (profile) {
          case 1:
            dashRoutes = [...adminRoutes];
            break;
          case 2:
            dashRoutes = [...bloggerRoutes];
            break;
          default:
            dashRoutes = [...defaultRoutes];
            break;
        }
      } else {
        dashRoutes = [...defaultRoutes];
      }
      return dashRoutes;
    })
    .catch((err) => {
      console.log(err);
      const dashRoutes = [...defaultRoutes];
      return dashRoutes;
    });
};
