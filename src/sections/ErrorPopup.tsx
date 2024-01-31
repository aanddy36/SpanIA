import { useDispatch, useSelector } from "react-redux";
import close from "../images/icons/close.svg";
import { cleanError } from "../features/reserveClass/reserveClassSlice";
import { RootState } from "../store";

export const ErrorPopup = () => {
  const dispatch = useDispatch();
  const { errorCreating } = useSelector(
    (store: RootState) => store.reserveClass
  );
  return (

      <div
        className=" w-[400px] bg-white rounded-lg fixed px-5 pb-5 pt-2
    top-[20px] left-[50%] translate-x-[-50%] shadow-md shadow-black/30
     flex flex-col gap-2 z-[999] border border-notAvail border-t-4 border-t-red"
      >
        <button
          className=" cursor-pointer"
          onClick={() => dispatch(cleanError())}
        >
          <img
            src={close}
            className="absolute top-3 right-3 transition-transform duration-200 hover:rotate-90 scale-[0.7]"
          />
        </button>
        <h1 className=" text-[18px] font-medium text-red">Error</h1>
        <span className="w-full text-[14px] opacity-80">{errorCreating}</span>
      </div>

  );
};