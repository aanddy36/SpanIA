import { useDispatch } from "react-redux";
import { EditableHoursStatus, Schedule_cell } from "../services/fakeUser";
import { hoveredEditHour, toggleCell, unhoveredEditHour } from "../features/adminSchedule/adminScheduleSlice";

export const EditorCell = ({cell, col}:{cell:Schedule_cell, col:number}) => {
  const dispatch = useDispatch();
  
  return (
    <div
      className={`h-[30px] w-full border-b border-r transition-colors duration-200 cursor-pointer ${
        cell.hourStatus === EditableHoursStatus.NOT_SELECTED
          ? "bg-notAvail hover:bg-reserved"
          : "bg-green hover:bg-hoverGreen"
      } relative group`}
      onMouseEnter={(e) => {
        dispatch(
          hoveredEditHour({
            y: (e.target as HTMLDivElement).getBoundingClientRect().top - 96,
            x: (e.target as HTMLDivElement).offsetLeft + 130,
            data: cell.time,
            col
          })
        );
      }}
      onMouseLeave={() => {
        dispatch(unhoveredEditHour());
      }}
      onClick={()=>dispatch(toggleCell({col, cell}))}
    ></div>
  );
};
