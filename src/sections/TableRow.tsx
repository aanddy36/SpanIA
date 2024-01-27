import { AdminClasses } from "../services/fakeUser";
import { formatDate, formatPrice, stringedHour } from "../services/helperFunctions";
import { StatusSpan } from "../ui/StatusSpan";

export const TableRow = ({
  id,
  studentName,
  studentEmail,
  startsOn,
  endsOn,
  status,
  price,
}: AdminClasses) => {
  const starting = new Date(startsOn)
  const ending = new Date(endsOn)
  return (
    <tr
      className="bg-white px-6 py-4 grid grid-cols-5 gap-[20px] text-[14px]
             opacity-80 font-semibold border-b"
    >
      <td>{id.slice(0,16)}</td>
      <td className="flex flex-col items-start gap-[7px]">
        {studentName}
        <span className=" text-xs font-normal opacity-80">
          {studentEmail}
        </span>
      </td>
      <td className="flex flex-col items-start gap-[7px]">
        {`${stringedHour(starting)} - ${stringedHour(ending)}`}
        <span className=" text-xs font-normal opacity-80">
          {formatDate(starting)}
        </span>
      </td>
      <td>
        <StatusSpan status={status} />
      </td>
      <td>{formatPrice(price)}</td>
    </tr>
  );
};
