import { useContext } from "react";
import AuthContext from "../context/auth-context";

const StatusBanner = (props) => {
  const ctx = useContext(AuthContext);

  const closeHandler = () => {
    ctx.setStatus("");
  };

  return (
    <div className="flex flex-row justify-between items-center bg-blue-100 px-4 py-2 font-thin text-sm">
      {props.msg}
      <button onClick={closeHandler}>x</button>
    </div>
  );
};

export default StatusBanner;
