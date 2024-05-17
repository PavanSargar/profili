import React from "react";
import { FaSpinner } from "react-icons/fa6";
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="animate-spin">
      <FaSpinner fontSize={24} />
    </div>
  );
};

export default Loading;
