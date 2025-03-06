

import { useEffect } from 'react';
import { getLocalStorage } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom';

function PrivateLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const token = getLocalStorage('token');
        if (!token) {
            navigate('/login')
        }
    }, [location, location.pathname])

    return children;
}

export default PrivateLayout;