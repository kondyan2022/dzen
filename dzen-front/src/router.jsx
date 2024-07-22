import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { postListLoader } from "./api/postListLoader";
import { ErrorPage, PostListPage } from "./pages";

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
      errorElement: <ErrorPage />,
    },
  ]
  //   { basename: "" }
);

export default router;
