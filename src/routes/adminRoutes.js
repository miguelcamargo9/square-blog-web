//Users
import RegisterUserForm from "../views/Users/RegisterUserForm";
import GeneratePosts from "../views/Posts/GeneratePosts";

// @material-ui/icons
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const adminRoutes = [
  ...generalRoutes,
  {
    collapse: true,
    name: "Posts",
    icon: SpeakerNotes,
    state: "pageCollapse",
    views: [
      {
        path: "/create-post",
        name: "Create Post",
        mini: "CP",
        component: RegisterUserForm,
        layout: "/admin",
      },
      {
        path: "/generate-posts",
        name: "Generate Posts",
        mini: "GP",
        component: GeneratePosts,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/register-page",
    name: "User Register",
    mini: "RU",
    component: RegisterUserForm,
    layout: "/auth",
    invisible: true,
  },
  ...generaFinallRoutes,
];
