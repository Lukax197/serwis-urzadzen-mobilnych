import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from 'react'
import PresistLogin from "./PersistLogin";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();


    useEffect(() => {
        console.log(auth?.username)
        console.log(allowedRoles?.includes(2001))
    },[])

    return (
        <>
            {allowedRoles?.includes(auth?.roles?.User) || allowedRoles?.includes(auth?.roles?.Employee) || allowedRoles?.includes(auth?.roles?.Admin)
                ? <Outlet />
                : auth?.username
                    ? <Navigate to="/brak-dostepu" state={{ from: location }} replace />
                    : <Navigate to="/signin" state={{ from: location }} replace />}
        </>
    );
}

export default RequireAuth;