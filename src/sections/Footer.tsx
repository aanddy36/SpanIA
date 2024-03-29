import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../features/auth/authSlice";
import { useEffect } from "react";
import { getConfiguration } from "../features/configuration/configurationSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const { isLoadingConfig, phone, address } = useSelector(
    (store: RootState) => store.configuration
  );
  const handleReserveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/reserve");
    } else {
      dispatch(toggleLogin(true));
    }
  };
  useEffect(()=>{
    dispatch(getConfiguration())
  },[])
  useEffect(()=>{isLoadingConfig},[isLoadingConfig])
  return (
    <div
      className=" w-full laptop:h-[316px] bg-black flex flex-col laptop:gap-5 laptop:items-center text-[13px] 
        text-white font-[200] justify-center gap-32 items-start p-10 laptop:p-0"
    >
      <div className=" flex gap-20 laptop:gap-36 items-start laptop:justify-center flex-col laptop:flex-row">
        <ul className="flex flex-col gap-5 items-start">
          <li className=" font-semibold text-[16px]">Connect</li>
          <a target="_blank" href="https://www.linkedin.com/in/delchiaroa/">
            LinkedIn
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            Instagram
          </a>
          <a target="_blank" href="https://www.facebook.com/">
            Facebook
          </a>
          <a target="_blank" href="https://twitter.com/?lang=es">
            Twitter
          </a>
        </ul>
        <ul className="flex flex-col gap-5 items-start">
          <li className=" font-semibold text-[16px]">Links</li>
          <Link to=".">Home</Link>
          <Link to="about">About Me</Link>
          <Link to="reserve" onClick={(e) => handleReserveClick(e)}>
            Reserve Class
          </Link>
        </ul>
        <ul className="flex flex-col gap-5 items-start">
          <li className=" font-semibold text-[16px]">Contact</li>
          <li className="max-w-[180px]">{address}</li>
          <li>{phone}</li>
          <li>anchibro@hotmail.com</li>
        </ul>
      </div>
      <span className=" text-white/70 mx-auto">
        Copyright ©2023 All rights reserved
      </span>
    </div>
  );
};
