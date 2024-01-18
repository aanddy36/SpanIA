import { useForm } from "react-hook-form";
import { PriceOptions } from "../services/fakeUser";
import { useDispatch } from "react-redux";
import { toggleEditor } from "../features/adminSchedule/adminScheduleSlice";

export const AdminSettings = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      price: PriceOptions.SHORT,
      phone: "+1 (123) 456-7890",
      address: "43 Raymouth Rd. Baltemoer, London 3910",
      avatar: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className=" text-[32px] font-medium">Settings</h1>
      <form
        className=" bg-white mt-[32px] w-full border rounded-lg px-10 py-6 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
          <label
            className=" w-[240px] text-start text-[14px] font-medium"
            htmlFor="price"
          >
            Modify Schedule
          </label>
          <button
            type="button"
            className="px-3 py-1 bg-red text-white text-[14px] rounded-lg w-fit
         transition-opacity duration-200 hover:bg-red/50"
            onClick={() => dispatch(toggleEditor(true))}
          >
            Open Editor
          </button>
        </div>
        <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
          <label
            className=" w-[240px] text-start text-[14px] font-medium"
            htmlFor="price"
          >
            Price per hour
          </label>
          <input
            className="py-1 px-3 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-red
           border-neutral-300"
            id="price"
            {...register("price")}
          />
        </div>
        <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
          <label
            className=" w-[240px] text-start text-[14px] font-medium"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="py-1 px-3 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-red
           border-neutral-300"
            id="phone"
            {...register("phone")}
          />
        </div>
        <div className="w-full pb-3 border-b flex items-center gap-[10px] justify-start pt-3">
          <label
            className=" w-[240px] text-start text-[14px] font-medium"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="py-1 px-3 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-red
           border-neutral-300"
            id="address"
            {...register("address")}
          />
        </div>
        <div className="w-full flex items-center gap-[10px] justify-start pt-3 pb-3 border-b">
          <label
            className=" w-[240px] text-start text-[14px] font-medium"
            htmlFor="image"
          >
            Avatar
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            className="text-[14px]"
            {...register("avatar")}
          />
        </div>
        <button
          className="px-3 py-1 bg-red text-white text-[14px] rounded-lg w-fit
         transition-opacity duration-200 hover:bg-red/50 mt-6"
        >
          Submit Changes
        </button>
      </form>
    </div>
  );
};
