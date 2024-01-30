import { useSelector } from "react-redux";
import { halfHourArray } from "../services/teachersAvailabiltyGrid";
import { RootState } from "../store";
import { EditorCell } from "./EditorCell";

export const EditorSchedule = () => {
  const { editableGrid } = useSelector(
    (store: RootState) => store.adminSchedule
  );
  /* useEffect(() => {
    console.log(selectedCells);
  }, [selectedCells]); */
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
      {editableGrid.map((col, nCol) => (
        <div className="flex flex-col" key={nCol}>
          {col.map((cell, row) => (
            <EditorCell cell={cell} col={nCol} key={row} />
          ))}
        </div>
      ))}
    </div>
  );
};
