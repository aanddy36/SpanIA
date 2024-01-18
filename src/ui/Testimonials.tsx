import maleUser from "../images/icons/maleUser.svg";
import femaleUser from "../images/icons/femaleUser.svg";

export const Testimonials = () => {
  return (
    <section className="flex flex-col gap-3 items-center mt-10 tablet:mt-20">
      <h3 className="font-medium text-red text-lg">Testimonial</h3>
      <h2 className="text-[40px] font-semibold text-center">
        What People Think
      </h2>
      <ul className="flex flex-col gap-12 full:gap-[73px] items-start mt-10 full:flex-row">
        <div className="flex flex-col gap-7 items-center">
          <div className="w-full flex justify-between items-start">
            <div className=" flex gap-5 items-center">
              <img src={maleUser} />
              <div>
                <h3 className=" font-semibold text-[16px]">
                  Andrew Del Chiaro
                </h3>
                <span className=" font-light text-[13px]">32 classes</span>
              </div>
            </div>
            <span className=" text-red text-[128px] font-special leading-none h-[12px]">
              "
            </span>
          </div>
          <span className=" text-[14px] font-light max-w-[336px] text-justify">
            I am so grateful to have had Javier as my Spanish teacher! Her
            passion for the language is contagious, and she creates a dynamic
            and engaging learning environment.
          </span>
        </div>

        <div className="flex flex-col gap-7 items-center">
          <div className="w-full flex justify-between items-start">
            <div className=" flex gap-5 items-center">
              <img src={femaleUser} />
              <div>
                <h3 className=" font-semibold text-[16px]">Hillary Brown</h3>
                <span className=" font-light text-[13px]">14 classes</span>
              </div>
            </div>
            <span className=" text-red text-[128px] font-special leading-none h-[12px]">
              "
            </span>
          </div>
          <span className=" text-[14px] font-light max-w-[336px] text-justify">
            Javier is a knowledgeable and dedicated Spanish teacher. His lessons
            are well-structured, and he provides a good balance between grammar,
            vocabulary, and conversational practice.
          </span>
        </div>

        <div className="flex flex-col gap-7 items-center">
          <div className="w-full flex justify-between items-start">
            <div className=" flex gap-5 items-center">
              <img src={maleUser} />
              <div>
                <h3 className=" font-semibold text-[16px]">Dan Brown</h3>
                <span className=" font-light text-[13px]">64 classes</span>
              </div>
            </div>
            <span className=" text-red text-[128px] font-special leading-none h-[12px]">
              "
            </span>
          </div>
          <span className=" text-[14px] font-light max-w-[336px] text-justify">
            Javier is an exceptional Spanish teacher who is not only
            knowledgeable but also incredibly patient. He takes the time to
            understand each student's learning style and adapts his teaching
            methods accordingly.
          </span>
        </div>
      </ul>
    </section>
  );
};
