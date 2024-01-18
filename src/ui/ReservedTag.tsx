import { stringedHour } from "../services/helperFunctions";

export const ReservedTag = ({ hour }: { hour: Date }) => {
    const theHour = stringedHour(hour)
  return (
    <div className="rounded-lg bg-black/70 text-white p-3 font-medium text-xs flex flex-col
      gap-1 items-center">
      <span>{theHour}</span>
      <span>Reserved</span>
    </div>
  );
};
