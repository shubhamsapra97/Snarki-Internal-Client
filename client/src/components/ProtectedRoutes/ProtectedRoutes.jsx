import React, {useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../providers/User/UserProvider";

const ProtectedRoute = () => {
    const {updateUser} = useContext(UserContext);
    const isAuthenticated = !!localStorage.getItem("token");
    if (!isAuthenticated) updateUser(null);
    return isAuthenticated ? <Outlet /> : <Navigate to="/snarki/register" />;
}

export default ProtectedRoute;
