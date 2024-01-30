import {
  changeDuration,
  changeWeek,
} from "../features/reserveClass/reserveClassSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa6";
import { formatDate } from "../services/helperFunctions";
import { DurationOptions } from "../services/models";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getConfiguration } from "../features/configuration/configurationSlice";

export const RCLegend = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { firstDay, duration } = useSelector(
    (store: RootState) => store.reserveClass
  );
  const { pricePerHour, isLoadingConfig } = useSelector(
    (store: RootState) => store.configuration
  );
  const { register, watch } = useForm({ defaultValues: { duration } });
  const formDuration = watch("duration");

  useEffect(() => {
    dispatch(getConfiguration());
  }, []);

  useEffect(() => {
    let newPrice = (Number(formDuration) / 60) * Number(pricePerHour);
    dispatch(
      changeDuration({ duration: Number(formDuration), price: newPrice })
    );
  }, [formDuration, isLoadingConfig]);

  const newDate = new Date(firstDay);
  newDate.setDate(newDate.getDate() + 6);
  return (
    <nav className=" flex justify-between items-center w-[928px] mx-auto mt-6">
      <ul className="flex gap-[21px] items-center">
        <div className=" flex items-center gap-[11px]">
          <span className=" rounded-full w-[15px] h-[15px] bg-green"></span>
          <span className=" text-sm opacity-50">Available</span>
        </div>
        <div className=" flex items-center gap-[11px]">
          <span className=" rounded-full w-[15px] h-[15px] bg-notAvail border"></span>
          <span className=" text-sm opacity-50">Not Available</span>
        </div>
        <div className=" flex items-center gap-[11px]">
          <span className=" rounded-full w-[15px] h-[15px] bg-reserved"></span>
          <span className=" text-sm opacity-50">Reserved</span>
        </div>
      </ul>

      <form className="flex items-center gap-2">
        <label className="opacity-50">
          <FaClock />
        </label>
        <select
          className="text-xs font-medium opacity-80"
          {...register("duration")}
        >
          <option value={DurationOptions.SHORT}>60 min</option>
          <option value={DurationOptions.MEDIUM}>90 min</option>
          <option value={DurationOptions.LONG}>120 min</option>
        </select>
      </form>

      <ul className="flex items-center gap-[21px]">
        <button
          className=" bg-notAvail rounded-full w-8 h-8 grid place-content-center cursor-pointer
        opacity-50 transition-opacity duration-200 hover:opacity-100 hover:bg-reserved
         disabled:cursor-not-allowed disabled:opacity-10"
          onClick={() => dispatch(changeWeek(false))}
          disabled={
            (new Date(firstDay).getTime() - new Date().getTime()) /
              1000 /
              60 /
              60 /
              24 <
            0
          }
        >
          <FaChevronLeft />
        </button>
        <li>
          {formatDate(new Date(firstDay))} - {formatDate(newDate)}
        </li>
        <li
          className=" bg-notAvail rounded-full w-8 h-8 grid place-content-center cursor-pointer
        opacity-50 transition-opacity duration-200 hover:opacity-100 hover:bg-reserved"
          onClick={() => dispatch(changeWeek(true))}
        >
          <FaChevronRight />
        </li>
      </ul>
    </nav>
  );
};
