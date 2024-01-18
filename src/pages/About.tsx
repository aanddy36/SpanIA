import javier1 from "../images/javier1.png";
import javier2 from "../images/javier2.png";
import javier3 from "../images/javier3.png";
import { Testimonials } from "../ui/Testimonials";
export const About = () => {
  return (
    <div className="px-4 pt-14 laptop:py-20 full:pt-6 flex flex-col gap-32 full:gap-0 
     bg-[url('src/images/Background.png')]">
      <section className="flex gap-10 laptop:pt-8 flex-col laptop:flex-row full:px-24">
        <div className=" flex flex-col gap-3 laptop:pt-24">
          <h1
            className=" font-extrabold text-[44px] full:text-[64px] max-w-[728px] leading-[60px]
           laptop:leading-[76px]"
          >
            I'm <span className="text-red">Javier</span>, A Passionate Teacher
          </h1>
          <h4 className="text-[20px] font-light max-w-[385px]">
            Fun, secure and awesome learning!
          </h4>
        </div>
        <img
          src={javier1}
          className="w-[90%] tablet:w-[60%] laptop:w-[300px] mx-auto full:w-fit laptop:max-h-[470px] laptop:max-w-[600px]"
        />
      </section>

      <section
        className="flex laptop:gap-32 laptop:mt-12 flex-col laptop:flex-row-reverse full:mx-24 justify-end
        gap-10"
      >
        <div className=" flex flex-col gap-7 tablet:gap-3 laptop:pt-24">
          <h1
            className=" font-semibold text-[40px] full:text-[40px] max-w-[728px] leading-[50px]
           laptop:leading-[76px]"
          >
            More About Myself
          </h1>
          <h4 className="text-[14px] text-left font-light max-w-[491px]">
            I enjoy spending time with simple things like going to a library and
            pass the time turning pages, but also I find it exciting just to be
            wandering on the streets trying to figure out what is going on with
            the people around me.
          </h4>
        </div>
        <img
          src={javier2}
          className="w-[90%] tablet:w-[60%] laptop:w-[300px] mx-auto full:w-fit laptop:max-h-[470px] laptop:max-w-[600px]
           laptop:mx-0"
        />
      </section>

      <section
        className="flex laptop:gap-32 laptop:mt-12 flex-col laptop:flex-row full:mx-24 justify-end
        gap-10"
      >
        <div className=" flex flex-col gap-7 tablet:gap-3 laptop:pt-24">
          <h1
            className=" font-semibold text-[40px] full:text-[40px] max-w-[537px] leading-[50px]
           "
          >
            Every new student is part of a great community!
          </h1>
          <h4 className="text-[14px] text-left font-light max-w-[491px]">
            I feel so lucky because of the kind of people from so many different
            cultures and countries who come to my life in this adventure
            "Spanish lessons"; besides the learning experience, I would love to
            make a much bigger community of friends, my students, to share and
            travel around Colombia. I could show you more about my beautiful
            country and I will help you plan your next trip to Colombia!
          </h4>
        </div>
        <img
          src={javier3}
          className="w-[90%] tablet:w-[60%] laptop:w-[300px] mx-auto full:w-fit laptop:max-h-[470px] laptop:max-w-[600px]
           laptop:mx-0"
        />
      </section>

      <Testimonials/>
    </div>
  );
};
