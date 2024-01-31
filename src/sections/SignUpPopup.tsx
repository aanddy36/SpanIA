import { useForm } from "react-hook-form";
import close from "../images/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  toggleLogin,
  toggleSignup,
} from "../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const SignUpPopup = () => {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { errorRegister, isLoading } = useSelector(
    (store: RootState) => store.auth
  );
  const onSubmit = (data: any) => {
    const name = `${data.name?.trim()} ${data.lastName?.trim()}`;
    const { email, phone, password } = data;
    let temp = {
      name,
      email,
      phone,
      password,
    };
    dispatch(registerUser({ userData: temp }));
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
          onClick={() => dispatch(toggleSignup(false))}
        >
          <img
            src={close}
            className="absolute top-6 right-6 transition-transform duration-200 hover:rotate-90"
          />
        </button>
        <h1 className=" text-[32px] font-medium">Welcome to SpanIA</h1>
        <h3 className=" font-light opacity-80 text-[16px]">START FOR FREE</h3>
        
        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
        {errorRegister && (
          <div className="text-red font-medium text-[14px] pb-2">
            {errorRegister}
          </div>
        )}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 items-start grow">
                <input
                  type="text"
                  className="w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is necessary",
                    minLength: {
                      value: 3,
                      message: "Name must be 3 to 15 characters long",
                    },
                    maxLength: {
                      value: 15,
                      message: "Name must be 3 to 15 characters long",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-red font-medium text-[12px]">
                    {errors.name.message as string}
                  </span>
                )}
              </div>
              <div>
                <input
                  className="w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md grow-0"
                  placeholder="Last name"
                  {...register("lastName", {
                    required: "Last name is necessary",
                    minLength: {
                      value: 3,
                      message: "Name must be 3 to 20 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name must be 3 to 20 characters long",
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="text-red font-medium text-[12px]">
                    {errors.lastName.message as string}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                className="w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md"
                placeholder="Email"
                {...register("email", {
                  required: "Email is necessary",
                  pattern: {
                    value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                    message: "Insert a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red font-medium text-[12px]">
                  {errors.email.message as string}
                </span>
              )}
            </div>
            <div>
              <input
                type="tel"
                className="w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md"
                placeholder="Phone"
                {...register("phone", {
                  required: "Phone is necessary",
                  pattern: /^\d{10}$/,
                })}
              />
              {errors.phone && (
                <span className="text-red font-medium text-[12px]">
                  {errors.phone.message as string}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                className="w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md"
                placeholder="Password"
                {...register("password", {
                  required: "Password is necessary",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 to 16 characters long",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be 8 to 16 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red font-medium text-[12px]">
                  {errors.password.message as string}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                className="w-full border border-black/40 text-[14px] font-light px-4 py-1 rounded-md"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === getValues().password || "Passwords doesn't match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red font-medium text-[12px]">
                  {errors.confirmPassword.message as string}
                </span>
              )}
            </div>
          </div>
          <button
            className="px-4 py-1 text-white bg-red rounded-lg text-[14px] w-full mt-14
                transition-colors duration-200 hover:bg-hoverRed disabled:cursor-not-allowed
                 disabled:opacity-50"
            disabled={isLoading}
          >
            Create Account
          </button>
        </form>
        <div className="text-[14px] text-red font-medium w-fit mx-auto mt-4">
          <span className="opacity-50 text-black ">Already a member?</span>{" "}
          <button
            className="cursor-pointer transition-all duration-200 hover:underline disabled:cursor-not-allowed
             disabled:opacity-50"
            disabled={isLoading}
            onClick={() => dispatch(toggleLogin(true))}
          >
            Log in
          </button>
        </div>
      </div>
    </article>
  );
};
