import { Schedule_cell, TeacherHoursStatus } from "../services/fakeUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  hoveredHour,
  selectCells,
  setHoveredCells,
  unhoveredHour,
} from "../features/reserveClass/reserveClassSlice";

export const SingleCell = ({
  cell,
  nCol,
  row,
}: {
  cell: Schedule_cell;
  nCol: number;
  row: number;
}) => {
  const dispatch = useDispatch();
  const { hoveredCells, duration, teachersSchedule, selectedCells } =
    useSelector((store: RootState) => store.reserveClass);
  const areAvailableToHover = (
    status: TeacherHoursStatus,
    col: number,
    row: number
  ) => {
    if (status === TeacherHoursStatus.AVAILABLE) {
      let nCells = duration / 30;
      let j = 1;
      let newGroup = [];
      for (let i = 0; i < nCells; i++) {
        if (row + i > 47) {
          if (col > 5) {
            let temp = { ...teachersSchedule[0][j - 1], id: `6_${j - 1}` };
            newGroup.push(temp);
          } else {
            newGroup.push(teachersSchedule[col + j][j - 1]);
          }
          j += 1;
        } else {
          newGroup.push(teachersSchedule[col][row + i]);
        }
      }
      if (
        newGroup.every(
          (cell) => cell.hourStatus === TeacherHoursStatus.AVAILABLE
        ) && newGroup[0].time > (new Date()).getTime()
      ) {
        dispatch(setHoveredCells(newGroup));
      }
    }
  };
  const isASelectedCell = selectedCells?.some(
    (asd) => JSON.stringify(asd) === JSON.stringify(cell)
  );
  const isAHoveredCell = hoveredCells?.some(
    (asd) => JSON.stringify(asd) === JSON.stringify(cell)
  );
  return (
    <div
      className={`h-[30px] w-full border-b border-r transition-colors duration-200 cursor-default ${
        cell.hourStatus === TeacherHoursStatus.NOT_AVAILABLE
          ? "bg-notAvail"
          :(cell.hourStatus === TeacherHoursStatus.AVAILABLE ? "bg-green" : "bg-reserved")
      } ${
        isASelectedCell && isAHoveredCell
          ? "!bg-hoverBlue !cursor-pointer"
          : isASelectedCell
          ? "!bg-blue !cursor-pointer"
          : isAHoveredCell && "!bg-hoverGreen !cursor-pointer"
      } relative group`}
      onMouseEnter={(e) => {
        dispatch(
          hoveredHour({
            y: (e.target as HTMLDivElement).getBoundingClientRect().y,
            x: (e.target as HTMLDivElement).offsetLeft + 130,
            data: cell.time,
            status: cell.hourStatus,
          })
        );
        areAvailableToHover(cell.hourStatus as TeacherHoursStatus, nCol, row);
      }}
      onMouseLeave={() => {
        dispatch(unhoveredHour());
        dispatch(setHoveredCells(null));
      }}
      onClick={() => dispatch(selectCells())}
    ></div>
  );
};
