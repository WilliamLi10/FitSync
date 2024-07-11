import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from "./pages/Root";
import Error from "./pages/Error";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Programs from "./pages/LoggedIn/Programs";
import Progress from "./pages/LoggedIn/Progress";
import LogWorkout from "./pages/LoggedIn/LogWorkout";
import DiscoverPrograms from "./components/Programs/DiscoverPrograms/DiscoverPrograms";
import MyPrograms from "./components/Programs/MyPrograms/MyPrograms";
import ProgramView from "./components/Programs/MyPrograms/ProgramView/ProgramView";
import { programLoader } from "./loaders/ProgramLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "progress", element: <Progress /> },
      { path: "logworkout", element: <LogWorkout /> },
      {
        path: "programs",
        element: <Programs />,
        children: [
          { index: true, element: <Navigate to="myprograms" replace /> },
          { path: "discover", element: <DiscoverPrograms /> },
          {
            path: "myprograms",
            element: <MyPrograms />,
          },
          {
            path: "/programs/myprograms/:programID",
            element: <ProgramView />,
            loader: programLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
