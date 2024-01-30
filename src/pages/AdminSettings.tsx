import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditor } from "../features/adminSchedule/adminScheduleSlice";
import { RootState } from "../store";
import { useEffect, useRef } from "react";
import {
  editConfiguration,
  getConfiguration,
} from "../features/configuration/configurationSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { LoadingAdmin } from "../sections/LoadingAdmin";

export const AdminSettings = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { phone, address, pricePerHour, isLoadingConfig } = useSelector(
    (store: RootState) => store.configuration
  );
  useEffect(() => {
    const fetchConfiguration = async () => {
      await dispatch(getConfiguration());
    };
    fetchConfiguration();
  }, []);
  const initialValues = {
    pricePerHour: pricePerHour,
    phone: phone,
    address: address,
    avatar: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (data: any) => {
    let formData = "" as any;
    if (inputRef?.current?.files?.[0]) {
      formData = new FormData();
      formData.append("avatar", inputRef.current.files[0]);
    }

    let newData = {
      ...data,
      pricePerHour: Number(data.pricePerHour),
      avatar: formData,
    };

    if (JSON.stringify(newData) === JSON.stringify(initialValues)) {
      reset();
    } else {
      dispatch(editConfiguration({ config: newData }));
    }
  };

  useEffect(() => {
    if (!isLoadingConfig) {
      reset({
        pricePerHour: pricePerHour,
        phone: phone,
        address: address,
        avatar: "",
      });
    }
  }, [isLoadingConfig]);

  if (isLoadingConfig) {
    return <LoadingAdmin />;
  }
  return (
    <div>
      <h1 className=" text-[32px] font-medium">Settings</h1>
      <div className="bg-white mt-[32px] w-full border rounded-lg px-10 py-6 flex flex-col">
        <form className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
          <label
            className=" w-[240px] text-start text-[14px] font-medium"
            htmlFor="price"
          >
            Modify Schedule
          </label>
          <button
            type="button"
            className="px-3 py-1 bg-red text-white text-[14px] rounded-lg w-fit
         transition-opacity duration-200 hover:bg-red/50"
            onClick={() => dispatch(toggleEditor(true))}
          >
            Open Editor
          </button>
        </form>
        <form
          className="w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
            <label
              className=" w-[240px] text-start text-[14px] font-medium"
              htmlFor="price"
            >
              Price per hour
            </label>
            <div className="flex flex-col items-start">
              <input
                className="py-1 px-3 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-red
           border-neutral-300"
                id="price"
                type="number"
                {...register("pricePerHour", {
                  required: "Please select a price",
                  min: {
                    value: 5,
                    message: "Minimum price per hour must be $5",
                  },
                })}
              />
              {errors.pricePerHour && (
                <span className="text-red font-medium text-[12px] mt-2">
                  {errors.pricePerHour.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
            <label
              className=" w-[240px] text-start text-[14px] font-medium"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="flex flex-col items-start">
              <input
                className="py-1 px-3 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-red
           border-neutral-300"
                id="phone"
                {...register("phone", {
                  required: "Please write a phone",
                })}
              />
              {errors.phone && (
                <span className="text-red font-medium text-[12px] mt-2">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
            <label
              className=" w-[240px] text-start text-[14px] font-medium"
              htmlFor="address"
            >
              Address
            </label>
            <div className="flex flex-col items-start">
              <input
                className="py-1 px-3 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-red
           border-neutral-300"
                id="address"
                {...register("address", {
                  required: "Please write an address",
                })}
              />
              {errors.address && (
                <span className="text-red font-medium text-[12px] mt-2">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex items-center gap-[10px] justify-start pt-3 pb-3 border-b">
            <label
              className=" w-[240px] text-start text-[14px] font-medium"
              htmlFor="image"
            >
              Avatar
            </label>
            <div className="flex flex-col items-start">
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                className="text-[14px]"
                ref={inputRef}
              />
              {errors.avatar && (
                <span className="text-red font-medium text-[12px] mt-2">
                  {errors.avatar.message}
                </span>
              )}
            </div>
          </div>
          <button
            className="px-3 py-1 bg-red text-white text-[14px] rounded-lg w-fit
         transition-opacity duration-200 hover:bg-red/50 mt-6"
          >
            Submit Changes
          </button>
        </form>
      </div>
    </div>
  );
};
