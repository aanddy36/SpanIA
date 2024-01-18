import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

export const ProtectedRoutes = () => {
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  
  if (!isLoggedIn) {
    return <Navigate to="/"/>
  } else {
    return <Outlet />;
  }
};
