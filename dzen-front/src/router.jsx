import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import { EventListPage } from "./pages/EventListPage/EventListPage";
// import { EventParticipantsPage } from "./pages/EventParticipantsPage/EventParticipants";
// import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";

// import {
//   addEventParticipantAction,
//   eventLoader,
//   participantsLoader,
// } from "./api/loaders";
import { postListLoader } from "./api/postListLoader";
import { PostListPage } from "./pages/PostListPage/PostListPage";

const router = createBrowserRouter(
  [
    {
      // path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          index: true,
          element: <PostListPage />,
          loader: postListLoader,
        },
      ],
      //   errorElement: <ErrorPage />,
    },
  ]
  //   { basename: "" }
);

export default router;
