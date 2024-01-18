import { useSelector } from "react-redux";
import { formatDayOfTheWeek } from "../services/helperFunctions";
import { RootState } from "../store";

export const ReserveHeaderRow = () => {
  const { firstDay } = useSelector((store: RootState) => store.reserveClass);
  let myArray = [0, 1, 2, 3, 4, 5, 6];
  const newDate = new Date(firstDay);
  newDate.setDate(newDate.getDate() + 0);
  return (
    <>
      {myArray.map((day) => {
        const newDate = new Date(firstDay);
        newDate.setDate(newDate.getDate() + day);
        let dayOfTheMonth = newDate.getDate();
        return (
          <div
            key={day}
            className="text-xs flex flex-col font-medium border-b border-r items-center gap-1 justify-center"
          >
            <span className=" text-xs opacity-70 font-medium uppercase">
              {formatDayOfTheWeek(newDate.getDay())}
            </span>
            <span className=" text-xs font-medium">
              {dayOfTheMonth < 10 ? `0${dayOfTheMonth}` : dayOfTheMonth}
            </span>
          </div>
        );
      })}
    </>
  );
};
