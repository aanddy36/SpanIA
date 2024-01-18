import { formatDayOfTheWeek } from '../services/helperFunctions';

export const EditorHeaderRow = () => {
    let myArray = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      {myArray.map((day) => {
        return (
          <div
            key={day}
            className="text-xs flex flex-col font-medium border-b border-r items-center gap-1 justify-center"
          >
            <span className=" text-xs opacity-70 font-medium uppercase">
              {formatDayOfTheWeek(day)}
            </span>
          </div>
        );
      })}
    </>
  )
}
