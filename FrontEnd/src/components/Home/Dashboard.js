import { getAccess } from "../../util/auth";

const Dashboard = () => {
  const isActive = false;

  return (
    <div className="bg-white mb-5 px-4 py-3 flex flex-row items-center rounded-md w-full shadow-sm">
      <div className="text-2xl font-semibold pr-5">
        Welcome, {getAccess().username}
      </div>
      <div className="flex flex-row items-center">
        <div
          className={`w-3 h-3 rounded-full ${
            isActive ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <p className={`pl-1 ${isActive ? "text-green-500" : "text-red-500"}`}>
          {`${isActive ? "P" : "No p"}rogram active`}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
