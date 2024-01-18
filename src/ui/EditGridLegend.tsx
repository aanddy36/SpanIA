import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  activeConfirmPopup,
  addCurrentSchedule,
} from "../features/adminSchedule/adminScheduleSlice";

export const EditGridLegend = () => {
  const dispatch = useDispatch();
  const { isCurrentScheduleAdded, selectedCells } = useSelector(
    (store: RootState) => store.adminSchedule
  );
  /*   useEffect(()=>{console.log(isCurrentScheduleAdded);
  },[isCurrentScheduleAdded]) */
  return (
    <nav className=" flex justify-between items-center w-[928px] mx-auto mt-6">
      <ul className="flex gap-[21px] items-center">
        <div className=" flex items-center gap-[11px]">
          <span className=" rounded-full w-[15px] h-[15px] bg-green"></span>
          <span className=" text-sm opacity-50">Selected</span>
        </div>
        <div className=" flex items-center gap-[11px]">
          <span className=" rounded-full w-[15px] h-[15px] bg-notAvail border"></span>
          <span className=" text-sm opacity-50">Not Selected</span>
        </div>
      </ul>
      <button
        type="button"
        className="px-3 py-1 bg-red text-white text-[14px] rounded-lg w-fit
         transition-opacity duration-200 hover:bg-red/50 disabled:bg-red/50 disabled:cursor-not-allowed"
        disabled={isCurrentScheduleAdded}
        onClick={() => {
          if (selectedCells.length) {
            dispatch(activeConfirmPopup("ADD_CURRENT"));
          } else {
            dispatch(addCurrentSchedule());
          }
        }}
      >
        Add current schedule
      </button>
    </nav>
  );
};
