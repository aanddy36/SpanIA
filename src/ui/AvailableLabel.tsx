import { useSelector } from "react-redux";
import {
  formatDayOfTheWeek,
  formatMonth,
  stringedHour,
} from "../services/helperFunctions";
import { RootState } from "../store";
import { DurationOptions } from "../services/models";

export const AvailableLabel = () => {
  const { hoveredCellInfo, duration } = useSelector((store: RootState) => store.reserveClass);
  let date = new Date(hoveredCellInfo?.date as number)
  const theDay = formatDayOfTheWeek(date.getDay());
  const theMonth = formatMonth(date.getMonth());
  const theHour = stringedHour(date);
  let newDate = new Date(date)
  if(duration === DurationOptions.MEDIUM){
    newDate.setHours(newDate.getHours()+(duration/60))   
    newDate.setMinutes(newDate.getMinutes()+30)
  }else{
    newDate.setHours(newDate.getHours()+(duration/60))
  }
  const finishingHour = stringedHour(newDate)
  return (
    <div
      className=" rounded-lg bg-black/70 text-white p-3 font-medium text-xs flex flex-col
      gap-1 items-center"
    >
      <span>{`${theDay} ${theMonth} ${date.getDate()}`}</span>
      <span>{theHour} - {finishingHour}</span>
    </div>
  );
};
