import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/Slice/authSlice';
import { Navigate } from 'react-router';

const ProtectedRoute = React.memo(({ children }) => {
    const dispatch = useDispatch();
    const { user, status } = useSelector(s => s.auth);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchCurrentUser());
    }, [status, dispatch]);

    const isAuthenticated = useMemo(() => !!user, [user]);

    if (status === 'loading' || status === 'idle') {
        return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace/>
    }
  return children;
});

export default ProtectedRoute;