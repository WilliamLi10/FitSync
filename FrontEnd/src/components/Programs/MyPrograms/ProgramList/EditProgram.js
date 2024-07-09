import { useEffect, useRef } from "react";
import { BsTrash } from "react-icons/bs";
import { LuCopy } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { RiUserSharedLine } from "react-icons/ri";

const EditProgram = (props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.modalHandler(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [modalRef]);

  const optionCSS = "hover:bg-gray-50 px-3 py-2 w-full flex items-center mr-20";
  const iconCSS = "mr-2";

  return (
    <div className="absolute bg-white shadow-md right-5 z-10" ref={modalRef}>
      {<div className={optionCSS}>
        <FiEdit className={iconCSS} />
        Rename
      </div>}
      <div className={optionCSS}>
        <LuCopy className={iconCSS} />
        Make a Copy
      </div>
      <div className={optionCSS}>
        <RiUserSharedLine className={iconCSS} />
        Share
      </div>
      <div className={optionCSS}>
        <BsTrash className={iconCSS} />
        Delete
      </div>
    </div>
  );
};

export default EditProgram;
