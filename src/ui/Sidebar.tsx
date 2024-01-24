import { Link, NavLink, useNavigate } from "react-router-dom";
import close from "../images/icons/close.svg";
import logo from "../images/icons/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { signOut, toggleLogin, toggleSignup } from "../features/auth/authSlice";
import { RootState } from "../store";
import { TokenRoles } from "../services/fakeUser";

export const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((store: RootState) => store.auth);

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
  return (
    <nav
      className={`fixed top-0 left-0 h-full z-10 bg-white laptop:hidden w-[200px]
       shadow-black/50 flex flex-col items-center gap-6 pt-16 transition-transform duration-200
       ${
         isSidebarOpen
           ? "translate-x-[0%] shadow-xl"
           : "translate-x-[-100%] shadow-none"
       }`}
    >
      <button
        className=" absolute top-4 right-4 transition-transform duration-200 hover:rotate-90 scale-[0.7]"
        onClick={() => setIsSidebarOpen(false)}
      >
        <img src={close} />
      </button>
      <Link to="." onClick={() => setIsSidebarOpen(false)}>
        <img src={logo} />
      </Link>
      <ul className=" flex flex-col w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " underline text-red px-4 py-3 border-b"
              : "no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? " underline text-red px-4 py-3 border-b"
              : "no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          About Me
        </NavLink>
        <NavLink
          to="/reserve"
          className={({ isActive }) =>
            isActive
              ? " underline text-red px-4 py-3 border-b"
              : "no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b"
          }
          onClick={(e) => {
            setIsSidebarOpen(false);
            handleReserveClick(e);
          }}
        >
          Reserve Class
        </NavLink>
        {!isLoggedIn ? (
          <>
            <button
              className="no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b
            text-left"
              onClick={() => {
                setIsSidebarOpen(false);
                dispatch(toggleLogin(true));
              }}
            >
              Log in
            </button>
            <button
              className="no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b
            text-left"
              onClick={() => {
                setIsSidebarOpen(false);
                dispatch(toggleSignup(true));
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              className="no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b
              text-left"
              onClick={() => {
                setIsSidebarOpen(false);
                profilePath();
              }}
            >
              Profile
            </button>
            <button
              className="no-underline text-black  transition-all duration-200 hover:px-8 px-4 py-3 border-b
            text-left"
              onClick={() => {
                setIsSidebarOpen(false);
                dispatch(signOut());
              }}
            >
              Log Out
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};
