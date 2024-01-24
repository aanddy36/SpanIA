import pres from "../images/icons/presentations.svg";
import dollar from "../images/icons/money.svg";
import students from "../images/icons/students.svg";
import clock from "../images/icons/clock.svg";
import { resume } from "../services/fakeUser";

export const AdminHome = () => {
  return (
    <div className="flex flex-col gap-[31px] h-full">
      <h1 className=" text-[32px] font-medium">Dashboard</h1>
      <section className=" flex gap-[30px]">
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#E0F2FE] grid place-content-center">
            <img src={pres} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">classes</span>
            <span className=" text-2xl font-medium">{resume.classes}</span>
          </div>
        </div>
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#DCFCE7] grid place-content-center">
            <img src={dollar} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">sales</span>
            <span className=" text-2xl font-medium">
              $
              {resume.sales.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#E0E7FF] grid place-content-center">
            <img src={students} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">
              students
            </span>
            <span className=" text-2xl font-medium">{resume.students}</span>
          </div>
        </div>
        <div className=" bg-white rounded-[10px] w-full p-4 flex justify-start gap-[15px] items-center border">
          <span className=" w-16 h-16 rounded-full bg-[#FEF9C3] grid place-content-center">
            <img src={clock} />
          </span>
          <div className="flex flex-col items-start">
            <span className="uppercase font-semibold text-[12px]">hours</span>
            <span className=" text-2xl font-medium">{resume.hours}</span>
          </div>
        </div>
      </section>
      <section className=" grid grid-cols-2 gap-[30px] h-full">
        <div className="rounded-[10px] grow border bg-white py-6 px-8">
          <h1 className=" text-[20px] font-medium">Sales time serie</h1>
        </div>
        <div className="rounded-[10px] grow border bg-white py-6 px-8">
          <h1 className=" text-[20px] font-medium">Duration summary</h1>
        </div>
      </section>
    </div>
  );
};
