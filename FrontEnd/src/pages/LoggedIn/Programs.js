import SideBar from "../../components/Programs/SideBar";
import { Outlet } from "react-router-dom";

const Programs = () => {
  return (
    <div className="grid overflow-hidden" style={{gridTemplateColumns: "auto 1fr"}}>
      <SideBar />
      <div className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Programs;
