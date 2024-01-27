import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { acceptCheck } from "../features/auth/authSlice";

export const RejectedPage = () => {
  const dispatch = useDispatch();
  return (
    <div className=" flex flex-col gap-4 items-center mt-24">
      <h1 className="text-4xl font-semibold text-red text-center">
        401 Access Denied
      </h1>
      <h3>
        You don't have permission to access this site!
      </h3>
      <Link
        to="/"
        className="px-4 py-1 text-white bg-red rounded-lg text-xl w-fit mt-4
            transition-colors duration-200 hover:bg-hoverRed disabled:opacity-50 
             disabled:cursor-not-allowed"
             onClick={()=>dispatch(acceptCheck())}
      >
        Get back
      </Link>
    </div>
  );
};
