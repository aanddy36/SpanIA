import { formatDate } from "../services/helperFunctions";
import { MiniClass } from "../sections/MiniClass";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { getUserClasses } from "../features/auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import noPhoto from "../images/no-photo.jpg";
import { LoadingPage } from "../sections/LoadingPage";

export const UserProfile = () => {
  /*   const sortedClasses = classes.sort(
    (a, b) => b.startsOn.getTime() - a.startsOn.getTime()
  ); */
  const { userInfo, classes, isLoading } = useSelector(
    (store: RootState) => store.auth
  );
  const formattedDate = formatDate(new Date(userInfo.joinedAt));
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;

  useEffect(() => {
    dispatch(getUserClasses({ id: userInfo.userId }));
  }, []);
  const thePhoto = userInfo.profilePhoto ? userInfo.profilePhoto : noPhoto;
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className=" bg-notAvail border py-8 px-2 tablet:px-6 flex flex-col gap-5 full:px-24 laptop:flex-row">
      <section
        className=" laptop:w-[300px] h-[390px] bg-white rounded-lg flex flex-col items-start 
      px-6 py-16 w-full"
      >
        <span className="border relative rounded-full group cursor-pointer mx-auto">
          <img src={thePhoto} className=" w-[91px] h-[91px] rounded-full" />
          <div
            className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100
            transition-all duration-200 grid place-content-center"
          >
            <FaCamera className="text-gray-200" />
          </div>
          <span
            className="bg-black/70 text-white py-1 px-4 rounded-lg absolute top-24 whitespace-nowrap
           text-[12px] hidden group-hover:block"
          >
            Change your image
          </span>
        </span>
        <h1 className=" text-2xl font-medium mt-6">{userInfo.name}</h1>
        <ul className=" opacity-50 text-[14px] mt-6 flex flex-col gap-2">
          <li>{classes.length} classes</li>
          <li>{userInfo.email}</li>
          <li>{userInfo.phone}</li>
          <li>Joined in {formattedDate}</li>
          <li>User ID: {userInfo.userId.slice(0, 16)}</li>
        </ul>
      </section>
      <section className="grow bg-white rounded-lg py-6 px-3 laptop:px-6 flex flex-col">
        <div className=" text-2xl border-b pb-2">Classes</div>
        <ul className=" grow overflow-auto pt-2 max-h-[290px]">
          {!classes.length ? (
            <div className=" py-6 italic opacity-50 h-full text-center text-xl">
              No classes yet
            </div>
          ) : (
            <>
              {classes.map((item) => {
                return <MiniClass key={item.id} {...item} />;
              })}
            </>
          )}
        </ul>
      </section>
    </div>
  );
};
