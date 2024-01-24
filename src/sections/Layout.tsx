import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogInPopup } from "./LogInPopup";
import { SignUpPopup } from "./SignUpPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Topbar } from "../ui/Topbar";
import { Sidebar } from "../ui/Sidebar";
import { Footer } from "./Footer";
import { ConfirmClassPopup } from "../ui/ConfirmClassPopup";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { checkToken } from "../features/auth/authSlice";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoginPopupOpen, isSignupPopupOpen } = useSelector(
    (store: RootState) => store.auth
  );
  const { isConfirmPopupOpen } = useSelector(
    (store: RootState) => store.reserveClass
  );
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch() as ThunkDispatch<
  RootState,
  undefined,
  AnyAction
>;
  //console.log(currentPath);
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (myToken) {
      dispatch(checkToken(myToken));
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPath]);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoginPopupOpen && <LogInPopup />}
      {isSignupPopupOpen && <SignUpPopup />}
      {isConfirmPopupOpen && <ConfirmClassPopup />}
      <Topbar handleClick={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="grow w-full">
        <Outlet />
      </div>
      {currentPath !== "/reserve" && <Footer />}
    </div>
  );
};
