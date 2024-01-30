import { useForm } from "react-hook-form";
import { ClassesStatus, filters } from "../services/models";
import { TableClasses } from "../sections/TableClasses";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { getClasses } from "../features/admin/adminSlice";
import { LoadingAdmin } from "../sections/LoadingAdmin";

export const AdminClasses = () => {
  const { register, watch } = useForm({
    defaultValues: {
      filtering: ClassesStatus.ALL,
      sorting: "-1",
    },
  });
  const myFilter = watch("filtering");
  const mySorting = watch("sorting");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  useEffect(() => {
    setPage(1)
    dispatch(
      getClasses({
        status: myFilter,
        sorting: mySorting as "-1" | "1",
        page: page,
      })
    );
  }, [myFilter]);
  useEffect(() => {
    dispatch(
      getClasses({
        status: myFilter,
        sorting: mySorting as "-1" | "1",
        page: page,
      })
    );
  }, [mySorting, page]);

  const { isLoading, classes, nClasses } = useSelector(
    (store: RootState) => store.admin
  );

  if (isLoading) {
    return <LoadingAdmin />;
  }

  return (
    <main className="">
      <section className="flex items-center justify-between">
        <h1 className=" text-[32px] font-medium">Classes</h1>
        <form className="flex items-center gap-[15px]">
          <ul className=" rounded-lg p-1 flex items-center gap-[10px] border bg-white">
            {filters.map((filter) => {
              return (
                <label
                  key={filter}
                  className={`text-[14px] px-2 py-1 rounded-lg cursor-pointer transition-colors duration-200
              hover:bg-red hover:text-white relative ${
                myFilter === filter
                  ? "bg-red text-white"
                  : "bg-white text-black"
              }`}
                  htmlFor={filter}
                >
                  {filter}
                  <input
                    type="radio"
                    className=" absolute inset-0 invisible"
                    id={filter}
                    value={filter}
                    {...register("filtering")}
                  />
                </label>
              );
            })}
          </ul>
          <select
            className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-red focus:ring-2
           text-[14px]"
            {...register("sorting")}
          >
            <option value="-1">Sort by date (recent first)</option>
            <option value="1">Sort by date (earlier first)</option>
          </select>
        </form>
      </section>
      <TableClasses
        classes={classes.slice(0, 10)}
        nOfClasses={nClasses}
        page={page}
        setPage={setPage}
      />
    </main>
  );
};
