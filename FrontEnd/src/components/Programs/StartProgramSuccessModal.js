import { useContext, useEffect, useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import WorkoutContext from "../../context/workout-context";

const StartProgramSuccessModal = () => {
  const ctx = useContext(WorkoutContext);
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        ctx.setStartProgramSuccessModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  return (
    <div
      ref={modalRef}
      className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 bg-white w-[60%] min-w-[500px] max-w-[700px] flex flex-col shadow-md items-center"
    >
      <div className="text-center text-2xl font-bold mt-10 mb-5">
        Program has started!
      </div>
      <AiFillCheckCircle className="text-green-500 w-24 h-24 mb-10" />
    </div>
  );
};

export default StartProgramSuccessModal;
