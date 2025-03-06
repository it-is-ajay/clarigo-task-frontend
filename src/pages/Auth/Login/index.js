import { useNavigate } from 'react-router-dom';
import Login from '../../../components/Login';
import axios from 'axios';
import { setLocalStorage } from '../../../utils';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const navigate = useNavigate();
    const handleUserLogin = async (values) => {
        try {
            const { email, password } = values;
            const bodyData = {
                email,
                password,
            }
            const { data: { data, msg } } = await axios.post('http://localhost:5000/api/login', bodyData);
            setLocalStorage('token', data.token);
            setLocalStorage('user', JSON.stringify(data));
            toast.success(msg);
            if (data.role === 'admin') {
                navigate('/admin-dashboard')
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!");
        }
    }
    return (
        <div>
            <Login
                handleUserLogin={handleUserLogin}
            />
        </div>
    );
}