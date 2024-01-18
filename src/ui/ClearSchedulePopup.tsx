import { useDispatch } from "react-redux";
import {
  activeConfirmPopup,
  clearSchedule,
} from "../features/adminSchedule/adminScheduleSlice";
import { FaXmark } from "react-icons/fa6";

export const ClearSchedulePopup = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] px-5 pb-5 pt-10 
      shadow-md shadow-black/30  rounded-lg bg-white text-black border flex items-center flex-col
       gap-6"
    >
      <button
        className="absolute top-2 right-2 text-xl hover:scale-[1.3]"
        onClick={() => dispatch(activeConfirmPopup(""))}
      >
        <FaXmark />
      </button>
      <h5>Are you sure you want to clear the schedule?</h5>
      <div className="flex gap-8 items-center">
        <button
          className="text-white bg-red rounded-lg py-1 px-3 font-semibold transition-opacity 
          duration-200 hover:bg-red/50"
          onClick={() => dispatch(activeConfirmPopup(""))}
        >
          No
        </button>
        <button
          className=" py-1 px-3 rounded-lg font-medium transition-opacity duration-200
           hover:opacity-50"
          onClick={() => dispatch(clearSchedule())}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
