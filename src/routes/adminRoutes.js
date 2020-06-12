//Users
import GeneratePosts from "../views/Posts/GeneratePosts";
import CreatePostForm from "../views/Posts/CreatePostForm";

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
        component: CreatePostForm,
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
  ...generaFinallRoutes,
];
