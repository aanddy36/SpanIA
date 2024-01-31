import { halfHourArray } from "../services/teachersAvailabiltyGrid";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SingleCell } from "./SingleCell";
import { LoadingAdmin } from "../sections/LoadingAdmin";

export const RCSchedule = () => {
  const { teachersSchedule, isLoadingAvail } = useSelector(
    (store: RootState) => store.reserveClass
  );
  if(isLoadingAvail){
    return <LoadingAdmin />
  }
  return (
    <div className="grid grid-cols-8 h-[270px] overflow-y-scroll border-red-scroll">
      <div className="flex flex-col relative bottom-[15px]">
        {halfHourArray.map((data) => {
          return (
            <div
              key={data}
              className="text-xs font-medium grid place-content-center w-full h-[30px] border-r"
            >
              {data}
            </div>
          );
        })}
      </div>
      {teachersSchedule.map((col, nCol) => (
        <div className="flex flex-col" key={nCol}>
          {col.map((cell, row) => (
            <SingleCell key={cell.id} cell={cell} nCol={nCol} row={row} />
          ))}
        </div>
      ))}
    </div>
  );
};
