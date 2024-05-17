import { FaSpinner } from "react-icons/fa6";
type Props = {};

const Loader = (props: Props) => {
  return (
    <div className=" h-screen w-auto flex items-center justify-center">
      <FaSpinner className="text-lime-100 animate-spin" fontSize={24} />
    </div>
  );
};

export default Loader;
