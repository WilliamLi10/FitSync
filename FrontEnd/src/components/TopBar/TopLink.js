import { NavLink } from "react-router-dom";

const TopLink = (props) => {
  return (
    <NavLink
      to={props.link}
      className={({ isActive }) =>
        `self-center py-4 px-4 transition ${
          isActive ? "border-solid border-b-2 border-slate-700" : " hover:bg-slate-50"
        }`
      }
    >
      {props.name}
    </NavLink>
  );
};

export default TopLink;
