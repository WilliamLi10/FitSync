import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Error from "./pages/Error";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Programs from "./pages/LoggedIn/Programs";
import LogWorkout from "./pages/LoggedIn/LogWorkout";
import ProgramView from "./components/Programs/ProgramView/ProgramView";
import { programLoader } from "./loaders/ProgramLoader";
import { workoutLoader } from "./loaders/WorkoutLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "logworkout",
        element: <LogWorkout />,
        loader: workoutLoader,
      },
      {
        path: "logworkout/:date",
        element: <LogWorkout />,
        loader: workoutLoader,
      },
      { path: "programs", element: <Programs /> },
      {
        path: "programs/:programID",
        element: <ProgramView />,
        loader: programLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
