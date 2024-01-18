import { useForm } from "react-hook-form";
import { ClassesStatus, classes, filters } from "../services/fakeUser";
import { TableClasses } from "../ui/TableClasses";

interface Form {
  filtering: ClassesStatus,
  sorting: "recent" | "earlier"
}

export const AdminClasses = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      filtering: ClassesStatus.ALL,
      sorting: "recent",
    },
  });
  const myFilter = watch("filtering");
  const onSubmit = (data: Form) => {
    console.log(data);
  };
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
                  onChange={handleSubmit(onSubmit as any)}
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
            <option value="recent" onChange={handleSubmit(onSubmit as any)}>
              Sort by date (recent first)
            </option>
            <option value="earlier" onChange={handleSubmit(onSubmit as any)}>
              Sort by date (earlier first)
            </option>
          </select>
        </form>
      </section>
      <TableClasses classes={classes.slice(0,10)} nOfClasses={12}/>
    </main>
  );
};
