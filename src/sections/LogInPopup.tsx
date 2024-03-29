import { FaLock, FaUser } from "react-icons/fa6";
import close from "../images/icons/close.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  toggleLogin,
  toggleSignup,
} from "../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const LogInPopup = () => {
  const [activedForm, setActivedForm] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const { errorAdmin, errorUser, isLoading } = useSelector(
    (store: RootState) => store.auth
  );
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const onSubmit = (data: any) => {
    let loginInfo = { email: "", password: "" };
    if (data.professorEmail) {
      loginInfo = {
        email: data.professorEmail,
        password: data.professorPassword,
      };
      dispatch(loginUser({ url: "professor", userData: loginInfo }));
    } else {
      loginInfo = {
        email: data.studentEmail,
        password: data.studentPassword,
      };
      dispatch(loginUser({ url: "students", userData: loginInfo }));
    }
    reset();
  };
  return (
    <article className="w-full h-screen fixed bg-black/50 z-[999]">
      <div
        className=" w-[98%] laptop:w-[591px] bg-white rounded-lg absolute px-5 tablet:px-8 pb-8
    top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] shadow-md shadow-black/30 pt-12 tablet:pt-0"
      >
        <button
          className=" cursor-pointer"
          onClick={() => dispatch(toggleLogin(false))}
        >
          <img
            src={close}
            className="absolute top-6 right-6 transition-transform duration-200 hover:rotate-90"
          />
        </button>
        <h1 className=" text-[32px] font-medium">Welcome to SpanIA</h1>
        <div className="flex gap-5 items-center justify-center tablet:justify-start mt-14 w-full tablet:w-fit">
          <button
            className={` flex flex-col items-center gap-4 transition-opacity duration-200 
          hover:opacity-100 ${
            activedForm
              ? "opacity-100 border-b border-red font-medium"
              : "opacity-50 border-none"
          }`}
            onClick={() => {
              setActivedForm(true);
              reset();
            }}
          >
            <span className=" scale-[1.5]">
              <FaUser />
            </span>
            <h5 className=" text-[14px]">Log in as student</h5>
          </button>
          <button
            className={` flex flex-col items-center gap-4 transition-opacity duration-200 
            hover:opacity-100 ${
              !activedForm
                ? "opacity-100 border-b border-red font-medium"
                : " opacity-50 border-none"
            }`}
            onClick={() => {
              setActivedForm(false);
              reset();
            }}
          >
            <span className=" scale-[1.5]">
              <FaLock />
            </span>
            <h5 className=" text-[14px]">Log in as professor</h5>
          </button>
        </div>
        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <input
              className={`w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md
                   ${activedForm ? "" : "hidden"}`}
              placeholder="Student's email"
              {...register("studentEmail")}
            />
            <input
              type="password"
              className={`w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md
                  ${activedForm ? "" : "hidden"}`}
              placeholder="Password"
              {...register("studentPassword")}
            />
            {errorUser && (
              <span
                className={`text-red font-medium text-[12px] ${
                  activedForm ? "" : "hidden"
                }`}
              >
                {errorUser}
              </span>
            )}

            <input
              className={`w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md
              ${!activedForm ? "" : "hidden"}`}
              placeholder="fakejavier@hotmail.com"
              {...register("professorEmail")}
            />
            <input
              type="password"
              className={`w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md
              ${!activedForm ? "" : "hidden"}`}
              placeholder="12345678"
              {...register("professorPassword")}
            />
            {errorAdmin && (
              <span
                className={`text-red font-medium text-[12px] ${
                  !activedForm ? "" : "hidden"
                }`}
              >
                {errorAdmin}
              </span>
            )}
          </div>
          <button
            className="px-4 py-1 text-white bg-red rounded-lg text-[14px] w-full mt-14
            transition-colors duration-200 hover:bg-hoverRed disabled:opacity-50 
             disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Log In
          </button>
        </form>
        <div className="text-[14px] text-red font-medium w-fit mx-auto mt-4">
          <span className="opacity-50 text-black ">Don’t have an account?</span>{" "}
          <button
            className="cursor-pointer transition-all duration-200 hover:underline"
            onClick={() => dispatch(toggleSignup(true))}
          >
            Sign up
          </button>
        </div>
      </div>
    </article>
  );
};
