import close from "../images/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleConfirmClass } from "../features/reserveClass/reserveClassSlice";
import { RootState } from "../store";
import { formatPrice, longDate, stringedHour } from "../services/helperFunctions";

export const ConfirmClassPopup = () => {

  const dispatch = useDispatch();
  const { selectedCells, price } = useSelector((store: RootState) => store.reserveClass);
  const { phone, address } = useSelector((store: RootState) => store.configuration);

  let startDate = selectedCells && new Date(selectedCells[0].time)
  let endingDate = selectedCells && new Date(selectedCells[selectedCells.length-1].time)
  endingDate?.setMinutes(endingDate.getMinutes()+30)
  const formattedDate = longDate(startDate as Date)
  let startingHour = stringedHour(startDate as Date)
  let endingHour = stringedHour(endingDate as Date)
  return (
    <article className="w-full h-screen fixed bg-black/50 z-[999]">
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
            <span className="font-medium">Hour:</span> {startingHour} - {endingHour}
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
        <button className="uppercase font-light w-full py-1 bg-red text-white text-[14px] rounded-lg
         mt-4 transition-opacity duration-200 hover:opacity-50">
          Confirm class
        </button>
      </div>
    </article>
  );
};
