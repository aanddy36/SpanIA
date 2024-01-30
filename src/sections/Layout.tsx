import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogInPopup } from "./LogInPopup";
import { SignUpPopup } from "./SignUpPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ConfirmClassPopup } from "./ConfirmClassPopup";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  acceptCheck,
  checkToken,
  rejectCheck,
} from "../features/auth/authSlice";
import { CheckStatus, TokenRoles } from "../services/models";
import { LoadingPage } from "./LoadingPage";
import { RejectedPage } from "./RejectedPage";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoginPopupOpen, isSignupPopupOpen, role, readyToCheck, isLoading } =
    useSelector((store: RootState) => store.auth);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myToken = localStorage.getItem("token");
        if (currentPath !== "/profile" && currentPath !== "/reserve") {
          if (myToken) {
            await dispatch(checkToken(myToken as any));
          } else {
            dispatch(acceptCheck());
          }
        } else {
          await dispatch(checkToken(myToken as any));
        }
        if (readyToCheck === CheckStatus.READY) {
          if (
            role !== TokenRoles.USER &&
            !isLoading &&
            currentPath === "/profile"
          ) {
            dispatch(rejectCheck());
          }
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    fetchData();
  }, [role]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPath]);

  if (readyToCheck === CheckStatus.CHECKING) {
    return <LoadingPage />;
  }
  if (readyToCheck === CheckStatus.FAILED) {
    return <RejectedPage />;
  }

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
