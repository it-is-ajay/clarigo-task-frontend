import { useEffect } from 'react';
import { getLocalStorage } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom';

function PrivateLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const token = getLocalStorage('token');
        const user = JSON.parse(getLocalStorage('user'));
        if (!token) {
            navigate('/login')
        }
        if (user?.role === 'user') {
            navigate('/')
        }
    }, [location, location.pathname])

    return children;
}

export default PrivateLayout;