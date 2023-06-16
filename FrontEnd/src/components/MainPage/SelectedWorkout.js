import { useRef, useEffect } from "react";

const SelectedWorkout = (props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.close();
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  return (
    <div
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2] bg-white w-[50%] pb-[20px] max-w-[500px] p-[40px]"
      ref={modalRef}
    ></div>
  );
};

export default SelectedWorkout;
