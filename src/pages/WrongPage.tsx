import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const WrongPage = () => {
  return (
    <div className="border h-screen grid grid-cols-1 place-content-center gap-6">
      <h1 className="mx-auto text-2xl font-semibold">
        Ups! You got to the wrong page!
      </h1>
      <Link
        to="/"
        className="mx-auto px-3 py-1 text-white bg-red rounded-lg transition-opacity duration-200
         hover:opacity-50 flex items-center gap-2"
      >
        <FaArrowLeft/>
        Home
      </Link>
    </div>
  );
};
