import landing1 from "../images/landing_photo.png";
import target from "../images/icons/target.svg";
import money from "../images/icons/dollar.svg";
import books from "../images/icons/books.svg";
import landing2 from "../images/landing_2.png";
import { Link, useNavigate } from "react-router-dom";
import { Testimonials } from "../ui/Testimonials";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleLogin } from "../features/auth/authSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const handleReserveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/reserve");
    } else {
      dispatch(toggleLogin(true));
    }
  };
  return (
    <div className="px-4 pb-20 mt-20 full:mt-6 flex flex-col bg-[url('src/images/Background.png')]">
      <section className="flex gap-10 flex-col full:flex-row full:pl-24">
        <div className=" flex flex-col gap-3 full:pt-32">
          <h3 className="font-medium text-red text-lg">Welcome To My Site</h3>
          <h1 className=" font-extrabold text-[60px] full:text-[70px] max-w-[540px] leading-[76px]">
            New Way To Learn <span className="text-red">Spanish</span>
          </h1>
          <h4 className="text-[14px] font-light max-w-[385px]">
            Domain the written and spoken skills of the Spanish language with
            engaging lessons and fast resaults!
          </h4>
          <Link
            to="reserve"
            onClick={(e) => handleReserveClick(e)}
            className=" rounded-md bg-red text-white font-medium px-8 py-1 w-fit mt-8
           transition-colors duration-200 hover:bg-hoverRed"
          >
            Start Now
          </Link>
        </div>
        <img src={landing1} className="full:max-h-[470px] full:max-w-[600px]" />
      </section>

      <section className="flex flex-col gap-3 items-center mt-40">
        <h3 className="font-medium text-red text-lg">Welcome To My Site</h3>
        <h2 className="text-[40px] font-semibold text-center">
          Provided Features
        </h2>
        <ul className="flex flex-col gap-12 full:gap-[153px] items-start mt-10 full:flex-row">
          <div className="flex flex-col gap-2 items-center">
            <img src={target} />
            <h3 className=" font-semibold text-[24px]">Private Target</h3>
            <span className=" text-[14px] font-light max-w-[259px] text-center">
              Classes are just for one person, so they will be personalized to
              your level and progress.{" "}
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <img src={money} />
            <h3 className=" font-semibold text-[24px]">Economic Classes</h3>
            <span className=" text-[14px] font-light max-w-[259px] text-center">
              Take advantage of the economic prices for our lessons.
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <img src={books} />
            <h3 className=" font-semibold text-[24px]">Modern Method</h3>
            <span className=" text-[14px] font-light max-w-[259px] text-center">
              You will be taught with the most advanced and effective learning
              methods.
            </span>
          </div>
        </ul>
      </section>

      <section
        className="flex gap-10 flex-col full:flex-row-reverse full:justify-between full:pl-12 mt-24
       mb-12"
      >
        <div className=" flex flex-col gap-3 full:pt-12">
          <h3 className="font-medium text-red text-lg">Who Am I?</h3>
          <h1
            className=" font-extrabold text-[36px] full:text-[48px] max-w-[631px] full:leading-[62px]
           leading-[46px]"
          >
            Hi, I’m Javier, I’ll be teaching you Spanish
          </h1>
          <h4 className="text-[14px] font-light max-w-[385px]">
            Discover what makes my lessons so effective
          </h4>
          <Link
            to="about"
            className=" rounded-md bg-red text-white font-medium px-8 py-1 w-fit mt-8
           transition-colors duration-200 hover:bg-hoverRed"
          >
            About Me
          </Link>
        </div>
        <img src={landing2} className="full:max-h-[470px] full:max-w-[600px]" />
      </section>

      <Testimonials />
    </div>
  );
};
