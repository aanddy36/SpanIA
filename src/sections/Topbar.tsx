import { useDispatch, useSelector } from "react-redux";
import logo from "../images/icons/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut, toggleLogin, toggleSignup } from "../features/auth/authSlice";
import { FaBars } from "react-icons/fa6";
import { RootState } from "../store";
import noPhoto from "../images/no-photo.jpg";
import logout from "../images/icons/logout.svg";
import setting from "../images/icons/setting.svg";
import { useState } from "react";
import { TokenRoles } from "../services/fakeUser";

export const Topbar = ({
  handleClick,
}: {
  handleClick: React.MouseEventHandler;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role, userInfo } = useSelector((store: RootState) => store.auth);
  const [isHovering, setIsHovering] = useState(false);

  const handleReserveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/reserve");
    } else {
      dispatch(toggleLogin(true));
    }
  };

  const profilePath = () => {
    if (role === TokenRoles.ADMIN) {
      navigate("/admin");
    } else if (role === TokenRoles.USER) {
      navigate("/profile");
    }
  };
  const thePhoto = userInfo.profilePhoto ? userInfo.profilePhoto : noPhoto;
  return (
    <nav className="px-10 py-4 flex justify-between w-full items-center shadow-md shadow-black/10">
      <Link to=".">
        <img src={logo} />
      </Link>
      <ul className="laptop:flex gap-10 items-center text-[15px] hidden ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " underline text-red"
              : " no-underline text-black  transition-colors duration-200 hover:text-red"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? " underline text-red"
              : " no-underline text-black  transition-colors duration-200 hover:text-red"
          }
        >
          About Me
        </NavLink>
        <NavLink
          to="/reserve"
          className={({ isActive }) =>
            isActive
              ? " underline text-red"
              : " no-underline text-black  transition-colors duration-200 hover:text-red"
          }
          onClick={(e) => handleReserveClick(e)}
        >
          Reserve Class
        </NavLink>
      </ul>
      {!isLoggedIn ? (
        <ul className="laptop:flex gap-8 items-center text-[15px] hidden">
          <button
            className="border-none bg-transparent transition-colors duration-200
           hover:text-red"
            onClick={() => dispatch(toggleLogin(true))}
          >
            Log in
          </button>
          <button
            className="px-4 py-2 text-white bg-red rounded-lg
            transition-colors duration-200 hover:bg-hoverRed"
            onClick={() => dispatch(toggleSignup(true))}
          >
            Sign Up
          </button>
        </ul>
      ) : (
        <div className="relative hidden laptop:block">
          <button
            className="cursor-pointer relative z-[1]"
            onMouseEnter={() => setIsHovering(true)}
          >
            <img src={thePhoto} className="w-[40px] h-[40px] rounded-full" />
          </button>
          {isHovering && (
            <div
              className=" absolute right-[-5px] top-[-5px] pt-14"
              onMouseLeave={() => setIsHovering(false)}
            >
              <ul className="w-[200px] flex flex-col shadow-md shadow-black/30 rounded-lg bg-white">
                <button className="flex gap-4 justify-start items-center px-4 py-4 cursor-pointer group">
                  <img src={setting} />
                  <span
                    className=" text-[14px] font-medium group-hover:text-red group-hover:underline
               transition-colors duration-200"
                    onClick={profilePath}
                  >
                    Profile
                  </span>
                </button>
                <button className="flex gap-4 justify-start items-center px-4 py-4 cursor-pointer group">
                  <img src={logout} />
                  <span
                    className=" text-[14px] font-medium group-hover:text-red group-hover:underline
               transition-colors duration-200"
                    onClick={() => dispatch(signOut())}
                  >
                    Log Out
                  </span>
                </button>
              </ul>
            </div>
          )}
        </div>
      )}
      <button
        className="border-none bg-transparent transition-transform duration-200
         hover:rotate-90 scale-[1.2] laptop:hidden cursor-pointer"
        onClick={handleClick}
      >
        <FaBars />
      </button>
    </nav>
  );
};
