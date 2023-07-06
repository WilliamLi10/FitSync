import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Error from "./pages/Error";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import SideBar from "./components/Programs/SideBar/SideBar";
import Progress from "./pages/Progress";
import LogWorkout from "./pages/LogWorkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Progress", element: <Progress /> },
      { path: "/LogWorkout", element: <LogWorkout /> },
      { path: "/Programs", element: <SideBar /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
