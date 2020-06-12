import RegisterUserForm from "../views/Users/RegisterUserForm";

// @material-ui/icons
//import Gift from "@material-ui/icons/CardGiftcard";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const defaultRoutes = [
  ...generalRoutes,
  {
    path: "/register-page",
    name: "Register User",
    mini: "RU",
    component: RegisterUserForm,
    layout: "/auth",
    logout: true,
  },
  ...generaFinallRoutes,
];
