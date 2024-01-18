import { FaClock } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const DurationTag = () => {
    const { duration } = useSelector(
        (store: RootState) => store.reserveClass
      );
  return (
    <div className="bg-notAvail rounded-full text-[14px] py-[2px] px-6 border font-medium opacity-80 
     flex items-center gap-4">
        <FaClock className="opacity-60"/>
      {duration} min
    </div>
  );
};
