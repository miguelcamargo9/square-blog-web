import Home from "../views/Home/Home";
import LoginPage from "../views/Pages/LoginPage";
import LogoutPage from "../views/Pages/LogoutPage";
import UserPosts from "../views/Posts/UserPosts";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Fingerprint from "@material-ui/icons/Fingerprint";

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
    icon: Fingerprint,
    component: LoginPage,
    layout: "/auth",
    logout: true,
  },
  {
    path: "/posts-user",
    name: "My Posts",
    mini: "MP",
    component: UserPosts,
    layout: "/admin",
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
    login: true,
  },
];
