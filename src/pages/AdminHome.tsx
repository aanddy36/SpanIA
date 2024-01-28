import pres from "../images/icons/presentations.svg";
import dollar from "../images/icons/money.svg";
import students from "../images/icons/students.svg";
import clock from "../images/icons/clock.svg";
import { DurationPie } from "../sections/DurationPie";
import { TimeSeries } from "../sections/TimeSeries";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useEffect } from "react";
import { getSummary } from "../features/admin/adminSlice";
import { LoadingAdmin } from "../sections/LoadingAdmin";

export const AdminHome = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { isLoading, summary } = useSelector((store: RootState) => store.admin);
  useEffect(() => {
    dispatch(getSummary());
  }, []);
  if (isLoading) {
    return <LoadingAdmin />;
  }
  return (
    <div className="flex flex-col gap-[31px]">
      <h1 className=" text-[32px] font-medium">Dashboard</h1>
      <section className=" flex gap-[30px]">
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#E0F2FE] grid place-content-center">
            <img src={pres} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">classes</span>
            <span className=" text-2xl font-medium">{summary.nClasses}</span>
          </div>
        </div>
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#DCFCE7] grid place-content-center">
            <img src={dollar} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">sales</span>
            <span className=" text-2xl font-medium">
              $
              {summary.totalSales.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#E0E7FF] grid place-content-center">
            <img src={students} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">
              students
            </span>
            <span className=" text-2xl font-medium">{summary.nStudents}</span>
          </div>
        </div>
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#FEF9C3] grid place-content-center">
            <img src={clock} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">hours</span>
            <span className=" text-2xl font-medium">{summary.totalHours}</span>
          </div>
        </div>
      </section>
      <section className=" grid grid-cols-2 gap-[40px] h-[350px]">
        <div className="rounded-[10px] grow border bg-white py-6 px-8 flex flex-col gap-2">
          <h1 className=" text-[20px] font-medium">Sales time serie</h1>
          <TimeSeries />
        </div>
        <div className="rounded-[10px] grow border bg-white py-6 px-8 flex flex-col gap-2">
          <h1 className=" text-[20px] font-medium">Duration summary</h1>
          <DurationPie />
        </div>
      </section>
    </div>
  );
};
