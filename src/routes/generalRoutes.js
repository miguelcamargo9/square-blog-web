import Home from "../views/Home/Home";
import LoginPage from "../views/Pages/LoginPage";
import LogoutPage from "../views/Pages/LogoutPage";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";

export const generalRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: Home,
    layout: "/admin",
  },
  {
    path: "/login-page",
    name: "Login Page",
    mini: "L",
    component: LoginPage,
    layout: "/auth",
    invisible: true,
  },
];

export const generaFinallRoutes = [
  {
    path: "/logout-page",
    name: "Logout Page",
    icon: ExitToApp,
    component: LogoutPage,
    layout: "/auth",
  },
];
