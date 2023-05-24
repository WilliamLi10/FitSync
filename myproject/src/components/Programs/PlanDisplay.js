import { useState } from "react";
import { RiCompassDiscoverLine, RiFileList2Line } from "react-icons/ri";
import SideBarSelector from "./SideBarSelector";

const PlanDisplay = (props) => {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);

  return (
    <div className=" flex flex-col h-screen">
      <div className="h-screen w-1/6 bg-gray-800">
        <SideBarSelector desc="My Programs" image={<RiFileList2Line />} />
        <SideBarSelector
          desc="Discover New Programs"
          image={<RiCompassDiscoverLine />}
        />
      </div>
    </div>
  );
};
export default PlanDisplay;
