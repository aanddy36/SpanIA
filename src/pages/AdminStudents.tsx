import { useForm } from "react-hook-form";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { TableStudents } from "../ui/TableStudents";
import { student } from "../services/fakeUser";

export const AdminStudents = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const searchBar = watch("searchBar");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue("searchBar", inputValue);
  };
  const onSubmit = (data:{ searchBar: string }) => {
    console.log(data);
  };
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
         onSubmit={handleSubmit(onSubmit as any)}
        >
          <input
            type="text"
            {...register("searchBar")}
            placeholder="Search a student by its name"
            className=" absolute inset-0 focus:outline-none bg-transparent text-[14px] py-1 px-10
             placeholder:italic placeholder:font-light focus:ring-2 focus:ring-red rounded-lg"
            onChange={handleInputChange}
          />
          <FaMagnifyingGlass className="opacity-40" />
          {searchBar && (
            <FaXmark className="opacity-40 transition-opacity duration-200 hover:opacity-100 cursor-pointer" 
            onClick={handleClearSearch}/>
          )}
        </form>
      </section>
      <TableStudents students={student}/>
    </main>
  );
};
