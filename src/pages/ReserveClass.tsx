import { useEffect } from "react";
import { ReserveHeaderRow } from "../ui/ReserveHeaderRow";
import { AvailableLabel } from "../ui/AvailableLabel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  getTeacherSchedule,
  toggleConfirmClass,
} from "../features/reserveClass/reserveClassSlice";
import { RCLegend } from "../ui/RCLegend";
import { RCSchedule } from "../ui/RCSchedule";
import noPhoto from "../images/no-photo.jpg";
import { formatPrice } from "../services/helperFunctions";
import { DurationTag } from "../ui/DurationTag";
import { SelectedTag } from "../ui/SelectedTag";

export const ReserveClass = () => {
  const dispatch = useDispatch();
  const {
    hoveredCellInfo,
    firstDay,
    hoveredCells,
    price,
    selectedCells,
    teachersSchedule,
  } = useSelector((store: RootState) => store.reserveClass);

  const {
    userInfo: { profilePhoto },
  } = useSelector((store: RootState) => store.auth);
  const newDate = new Date(firstDay);
  newDate.setDate(newDate.getDate() + 6);

  useEffect(() => {
    dispatch(getTeacherSchedule());
  }, [firstDay]);

/*   useEffect(() => {
    console.log(teachersSchedule);
  }, [teachersSchedule]); */

  const thePhoto = profilePhoto ? profilePhoto : noPhoto
  return (
    <div className="border">
      <section className=" text-xl font-semibold w-full text-center py-6 border-b">
        Schedule Your Classes
      </section>

      <RCLegend />

      <section className=" w-[928px] mx-auto h-[318px] border rounded-lg my-6">
        <div className="grid grid-cols-8 h-[48px]">
          <div className="text-xs grid place-content-center font-medium border-b border-r text-black/50">
            UTC - 05:00
          </div>
          <ReserveHeaderRow />
        </div>
        <RCSchedule />
        {hoveredCells && (
          <div
            className="absolute"
            style={{
              top: `${hoveredCellInfo?.y}px`,
              left: `${hoveredCellInfo?.x}px`,
            }}
          >
            <AvailableLabel />
          </div>
        )}
      </section>

      <section className="border h-[71px] flex items-center justify-between px-6">
        <div className="flex items-center gap-14">
          <img src={thePhoto} className="w-[40px] h-[40px] rounded-full border" />
          <div className="flex items-center gap-8">
            <DurationTag />
            {selectedCells && <SelectedTag />}
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <span className=" text-2xl">{formatPrice(price)}</span>
          <button
            className="text-white bg-red rounded-lg py-1 px-3 uppercase font-semibold
         transition-opacity duration-200 hover:bg-red/50 disabled:bg-red/50 disabled:cursor-not-allowed"
            disabled={!selectedCells}
            onClick={() => dispatch(toggleConfirmClass(true))}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
