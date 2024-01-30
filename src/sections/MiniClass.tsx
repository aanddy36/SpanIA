import { Classes } from "../services/models";
import { formatDate, formatPrice, stringedHour } from "../services/helperFunctions";
import { StatusSpan } from "../ui/StatusSpan";

export const MiniClass = ({
  startsOn,
  endsOn,
  professorAddress,
  professorPhone,
  status,
  price,
}: Classes) => {
  const starting = new Date(startsOn)
  const ending = new Date(endsOn)
  const formattedDate = formatDate(starting);
  return (
    <li className="border-b flex justify-between items-start pb-2 pt-3 px-2">
      <div className="flex flex-col gap-[2px] max-w-[68%] tablet:max-w-fit">
        <span className=" text-lg font-medium">
          {stringedHour(starting)} - {stringedHour(ending)} | {formattedDate}
        </span>
        <span className="text-[14px] opacity-60 font-light">
          {professorAddress}
        </span>
        <span className="text-[14px] opacity-60 font-light">
          {professorPhone}
        </span>
      </div>
      <div className=" flex flex-col items-end gap-2 font-medium">
        <StatusSpan status={status} />
        <span className=" text-[16px]">
          {formatPrice(price)}
        </span>
      </div>
    </li>
  );
};
