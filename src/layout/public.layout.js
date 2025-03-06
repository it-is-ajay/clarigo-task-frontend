import { useEffect } from 'react';
import { getLocalStorage } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom';

function PublicLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const token = getLocalStorage('token');
        if (token) {
            navigate('/')
        }
    }, [location, location.pathname])

    return children;
}

export default PublicLayout;