import close from "../images/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  createClass,
  toggleConfirmClass,
} from "../features/reserveClass/reserveClassSlice";
import { RootState } from "../store";
import {
  formatPrice,
  longDate,
  stringedHour,
} from "../services/helperFunctions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { LoadingAdmin } from "./LoadingAdmin";

export const ConfirmClassPopup = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { selectedCells, price, duration, isLoadingAvail, firstDay } = useSelector(
    (store: RootState) => store.reserveClass
  );
  const { phone, address } = useSelector(
    (store: RootState) => store.configuration
  );
  const {
    userInfo: { userId: studentId },
  } = useSelector((store: RootState) => store.auth);

  let startDate = selectedCells && new Date(selectedCells[0].time);
  let endingDate =
    selectedCells && new Date(selectedCells[selectedCells.length - 1].time);
  endingDate?.setMinutes(endingDate.getMinutes() + 30);

  const formattedDate = longDate(startDate as Date);
  let startingHour = stringedHour(startDate as Date);
  let endingHour = stringedHour(endingDate as Date);

  const submitClass = () => {
    let newClass = {
      duration,
      price,
      startsOn: startDate,
      endsOn: endingDate,
      studentId,
    };
    let hoursToReserve = selectedCells?.map((cell) => {
      return { hour: new Date(cell.time) };
    });
    dispatch(createClass({ newClass, hoursToReserve, time:firstDay }));
  };

  return (
    <article className="w-full h-screen fixed bg-black/50 z-[999]">
      {isLoadingAvail ? (
        <div
          className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]
    shadow-md shadow-black/30  rounded-lg bg-white px-28 pt-16 pb-20 scale-[0.5]"
        >
          <LoadingAdmin />
        </div>
      ) : (
        <div
          className=" w-[98%] laptop:w-[591px] bg-white rounded-lg absolute px-5 tablet:px-8 pb-8
    top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] shadow-md shadow-black/30 pt-12 tablet:pt-0
     flex flex-col gap-8"
        >
          <button
            className=" cursor-pointer"
            onClick={() => dispatch(toggleConfirmClass(false))}
          >
            <img
              src={close}
              className="absolute top-6 right-6 transition-transform duration-200 hover:rotate-90"
            />
          </button>
          <h1 className=" text-[32px] font-medium">Class Details</h1>
          <ul className="flex flex-col gap-3">
            <li className=" text-base font-light">
              <span className="font-medium">Date:</span> {formattedDate}
            </li>
            <li className=" text-base font-light">
              <span className="font-medium">Hour:</span> {startingHour} -{" "}
              {endingHour}
            </li>
            <li className=" text-base font-light">
              <span className="font-medium">Javier’s Phone:</span> {phone}
            </li>
            <li className=" text-base font-light">
              <span className="font-medium">Location:</span> {address}
            </li>
            <li className=" text-base font-light">
              <span className="font-medium">Price:</span> {formatPrice(price)}
            </li>
          </ul>
          <button
            className="uppercase font-light w-full py-1 bg-red text-white text-[14px] rounded-lg
         mt-4 transition-opacity duration-200 hover:opacity-50"
            onClick={submitClass}
          >
            Confirm class
          </button>
        </div>
      )}
    </article>
  );
};
