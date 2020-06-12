//Users
import RegisterUserForm from "../views/Users/RegisterUserForm";
import CreatePostForm from "../views/Posts/CreatePostForm";

// @material-ui/icons
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";

import { generalRoutes, generaFinallRoutes } from "./generalRoutes";

export const bloggerRoutes = [
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
        component: CreatePostForm,
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
