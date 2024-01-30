import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { AdminClasses } from "../services/models";
import { TableRow } from "./TableRow";
import { useEffect, useState } from "react";

export const TableClasses = ({
  classes,
  nOfClasses,
  page,
  setPage,
}: {
  classes: AdminClasses[];
  nOfClasses: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  const [lastNumber, setLastNumber] = useState(10);
  useEffect(() => {
    let newPage = (page - 1) * 10 + 10;
    if (nOfClasses < newPage) {
      setLastNumber(nOfClasses);
    } else {
      setLastNumber(newPage);
    }
  }, []);
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
          <tr>
            <td className="bg-white py-6 text-center italic opacity-75">
              There are no classes yet
            </td>
          </tr>
        ) : (
          classes.map((cl) => {
            return <TableRow key={cl.id} {...cl} />;
          })
        )}
      </tbody>
      <tfoot className="">
        {!nOfClasses ? (
          <tr>
            <td></td>
          </tr>
        ) : (
          <tr className=" px-6 py-3 flex justify-between text-[14px] items-center">
            <td colSpan={2}>
              <span>
                Showing {(page - 1) * 10 + 1} to {lastNumber} of {nOfClasses}{" "}
                results
              </span>
            </td>
            <td colSpan={2}>
              <div className=" flex items-center gap-[10px]">
                <button
                  className="rounded-lg transition-colors duration-200 hover:bg-red hover:text-white
                flex items-center gap-[10px] text-[14px] py-[6px] px-3 disabled:opacity-50
                 disabled:cursor-not-allowed"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <FaChevronLeft />
                  Previous
                </button>
                <button
                  className="rounded-lg transition-colors duration-200 hover:bg-red hover:text-white
             flex items-center gap-[10px] text-[14px] py-[6px] px-3 disabled:opacity-50
              disabled:cursor-not-allowed"
                  disabled={nOfClasses === lastNumber}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                  <FaChevronRight />
                </button>
              </div>
            </td>
          </tr>
        )}
      </tfoot>
    </table>
  );
};
