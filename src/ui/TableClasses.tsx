import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Classes } from "../services/fakeUser";
import { TableRow } from "./TableRow";

export const TableClasses = ({
  classes,
  nOfClasses,
}: {
  classes: Classes[];
  nOfClasses: number;
}) => {
  return (
    <table className="mt-[31px] w-full rounded-lg border">
      <thead className="border-b">
        <tr className=" px-6 py-4 grid grid-cols-5 gap-[20px]">
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left">
            ID
          </th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left">
            student
          </th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left">
            dates
          </th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left">
            status
          </th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left">
            amount
          </th>
        </tr>
      </thead>
      <tbody>
        {!classes.length ? (
          <td className="bg-white py-6 text-center italic opacity-75">There are no classes yet</td>
        ) : (
          classes.map((cl) => {
            return <TableRow key={cl.id} {...cl} />;
          })
        )}
      </tbody>
      <tfoot className=" px-6 py-3 flex justify-between text-[14px] items-center">
        {!nOfClasses ? (
          ""
        ) : (
          <>
            <span>Showing 1 to 10 of {nOfClasses} results</span>
            <div className=" flex items-center gap-[10px]">
              <button
                className="rounded-lg transition-colors duration-200 hover:bg-red hover:text-white
             flex items-center gap-[10px] text-[14px] py-[6px] px-3"
              >
                <FaChevronLeft />
                Previous
              </button>
              <button
                className="rounded-lg transition-colors duration-200 hover:bg-red hover:text-white
             flex items-center gap-[10px] text-[14px] py-[6px] px-3"
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </tfoot>
    </table>
  );
};
