import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import { UserContext } from './providers/User/UserProvider';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import ClaimRequests from './components/Requests/ClaimRequests';
import ViewClaimRequest from './components/Requests/ViewClaimRequests';

const NavRoutes = () => {
    const {user} = useContext(UserContext);

    return (
        <Routes>
            <Route path='/' element={<Navigate to="/snarki/register" />} />
            <Route path='/snarki/:action' element={
                user ? <Navigate to="/dashboard" /> : <RestaurantForm />
            } />
            <Route path='/dashboard' element={<ProtectedRoute />}>
                <Route exact path='/dashboard' element={<Navigate to="/dashboard/requests/claim" />} />
                <Route exact path='/dashboard/requests/claim' element={<ClaimRequests />} />
                <Route exact path='/dashboard/requests/claim/:requestId' element={<ViewClaimRequest />} />
            </Route>
        </Routes>
    );
};

export default NavRoutes;
