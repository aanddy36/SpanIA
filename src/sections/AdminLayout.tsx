import logo from "../images/icons/logo.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import house from "../images/icons/home.svg";
import calendar from "../images/icons/calendar.svg";
import students from "../images/icons/students.svg";
import settings from "../images/icons/setting.svg";
import logout from "../images/icons/logout.svg";
import { CheckStatus, TokenRoles } from "../services/fakeUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ScheduleEditor } from "../pages/ScheduleEditor";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { checkToken, rejectCheck, signOut } from "../features/auth/authSlice";
import noPhoto from "../images/no-photo.jpg";
import { LoadingPage } from "./LoadingPage";
import { RejectedPage } from "./RejectedPage";

export const AdminLayout = () => {
  const isActiveStyle = {
    backgroundColor: "#F5F6F9",
  };
  const { isEditorOpen } = useSelector(
    (store: RootState) => store.adminSchedule
  );
  const { role, userInfo, isLoading, readyToCheck } = useSelector(
    (store: RootState) => store.auth
  );
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myToken = localStorage.getItem("token");
        await dispatch(checkToken(myToken as any));
        if (readyToCheck === CheckStatus.READY) {
          
          if (role !== TokenRoles.ADMIN && !isLoading ) {
            dispatch(rejectCheck())
          }
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    fetchData();
  }, [role]);

  if (readyToCheck === CheckStatus.CHECKING) {
    return <LoadingPage />;
  }
  if (readyToCheck === CheckStatus.FAILED) {
    return <RejectedPage />;
  }
  const thePhoto = userInfo.profilePhoto ? userInfo.profilePhoto : noPhoto;
  return (
    <div className="flex min-w-screen">
      {isEditorOpen && <ScheduleEditor />}
      <section className=" px-6 py-8 flex flex-col items-center gap-10 border h-screen">
        <Link to="/">
          <img src={logo} className="w-[135px] h-[49px]" />
        </Link>
        <ul className=" flex flex-col">
          <NavLink
            to="."
            end
            className="w-[212px] px-6 py-3 text-lg rounded-lg flex gap-[15px]"
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            <img src={house} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="classes"
            className="w-[212px] px-6 py-3 text-lg rounded-lg flex gap-[15px]"
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            <img src={calendar} />
            <span>Classes</span>
          </NavLink>
          <NavLink
            to="students"
            className="w-[212px] px-6 py-3 text-lg rounded-lg flex gap-[15px]"
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            <img src={students} />
            <span>Students</span>
          </NavLink>
          <NavLink
            to="settings"
            className="w-[212px] px-6 py-3 text-lg rounded-lg flex gap-[15px]"
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            <img src={settings} />
            <span>Settings</span>
          </NavLink>
        </ul>
      </section>
      <div className="grow w-full max-h-screen flex flex-col">
        <nav className="h-[70px] border-b px-12 py-3 flex justify-end">
          <section className="gap-[35px] flex ">
            <div className=" flex items-center gap-[10px]">
              <img src={thePhoto} className=" w-9 h-9 rounded-full" />
              <span className=" text-[14px]">
                {userInfo.name?.split(" ")[0]}
              </span>
            </div>
            <button
              onClick={() => {
                dispatch(signOut());
              }}
            >
              <img
                src={logout}
                className=" w-[22px] h-[22px] opacity-50 transition-opacity duration-200 hover:opacity-100"
              />
            </button>
          </section>
        </nav>
        <div className=" bg-notAvail px-12 py-10 h-full overflow-y-scroll grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
