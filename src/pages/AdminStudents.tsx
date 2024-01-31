import { useForm } from "react-hook-form";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { TableStudents } from "../ui/TableStudents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getStudents } from "../features/admin/adminSlice";
import { LoadingSection } from "../sections/LoadingSection";

export const AdminStudents = () => {
  const { register, watch, setValue } = useForm({
    defaultValues: { searchBar: "" },
  });
  const searchBar = watch("searchBar");
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { isLoading, students } = useSelector(
    (store: RootState) => store.admin
  );

  useEffect(() => {
    let inputVv = searchBar?.trim();

    dispatch(getStudents({ input: inputVv }));
  }, [searchBar]);

  const handleClearSearch = () => {
    setValue("searchBar", "");
  };

  return (
    <main>
      <section className="flex items-center justify-between">
        <h1 className=" text-[32px] font-medium">Students</h1>
        <form
          className="relative border border-neutral-300 rounded-lg w-[400px] h-[36px] flex 
         justify-between items-center px-3"
        >
          <input
            type="text"
            {...register("searchBar")}
            placeholder="Search a student by its name"
            className=" absolute inset-0 focus:outline-none bg-transparent text-[14px] py-1 px-10
             placeholder:italic placeholder:font-light focus:ring-2 focus:ring-red rounded-lg"
          />
          <FaMagnifyingGlass className="opacity-40" />
          {searchBar && (
            <FaXmark
              className="opacity-40 transition-opacity duration-200 hover:opacity-100 cursor-pointer"
              onClick={handleClearSearch}
            />
          )}
        </form>
      </section>
      {isLoading ? <LoadingSection /> : <TableStudents students={students} />}
    </main>
  );
};
