import { Outlet } from "react-router-dom";
import { useState } from "react";
import TopBar from "../components/TopBar/TopBar";

const Root = () => {

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
  });

  return (
    <div>
      <TopBar UserInfo={user} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
