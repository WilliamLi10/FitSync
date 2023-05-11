import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import 'tailwindcss/tailwind.css';

function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25
  });

  return (
    <div className="flex">
      <TopBar UserInfo={user}/>

    </div>
  );
}

export default App;
