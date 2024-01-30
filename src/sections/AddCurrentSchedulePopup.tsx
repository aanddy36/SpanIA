import { useDispatch, useSelector } from "react-redux";
import {
  activeConfirmPopup,
  getSchedule,
} from "../features/adminSchedule/adminScheduleSlice";
import { FaXmark } from "react-icons/fa6";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoadingAdmin } from "./LoadingAdmin";

export const AddCurrentSchedulePopup = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { isLoadingSched } = useSelector(
    (store: RootState) => store.adminSchedule
  );
  if (isLoadingSched) {
    return (
      <div
        className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]
    shadow-md shadow-black/30  rounded-lg bg-white px-28 pt-16 pb-20 scale-[0.5]"
      >
        <LoadingAdmin />
      </div>
    );
  }
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
      <h5>Are you sure you want to add the current schedule?</h5>
      <h5 className="mt-[-25px]"> The previous changes will be overwritten</h5>
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
          onClick={() => dispatch(getSchedule())}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
