import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const Landing = () => {
  const ctx = useContext(AuthContext);

  return (
    <div className="m-14">
      <div className="text-center">
      <p className="text-8xl font-semibold w-[70%] pb-6 mx-auto pt-24">
        The Ultimate Workout Companion
        </p>
        <p className="text-xl font-semibold pb-24 mx-auto">
          Effortlessly create, track, and record your workouts
        </p>
        <button
          onClick={() => {
            ctx.setLoginModal(true);
          }}
          className="text-white text-xl w-[300px] font-light bg-slate-700 px-3 py-2 rounded-full border border-slate-700 hover:text-slate-700 hover:bg-white"
        >
          Get Started for Free
        </button>
      </div>
    </div>
  );
};

export default Landing;
