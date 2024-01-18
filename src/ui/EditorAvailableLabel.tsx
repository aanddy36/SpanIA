import { useSelector } from "react-redux";
import { RootState } from "../store";
import { stringedHour } from "../services/helperFunctions";

const dateOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const EditorAvailableLabel = () => {
  const { hoveredCell } = useSelector(
    (store: RootState) => store.adminSchedule
  );
  let date = new Date(hoveredCell?.date as number);
  const theDay = dateOfTheWeek[hoveredCell?.col as number];
  const theHour = stringedHour(date);
  let newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + 30);
  const finishingHour = stringedHour(newDate);
  return (
    <div
      className=" rounded-lg bg-black/70 text-white p-3 font-medium text-xs flex flex-col
  gap-1 items-center"
    >
      <span>{theDay}</span>
      <span>
        {theHour} - {finishingHour}
      </span>
    </div>
  );
};
