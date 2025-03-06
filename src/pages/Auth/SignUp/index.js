
import axios from 'axios';
import SignUp from '../../../components/SignUp'
import { toast } from 'react-toastify';
import { setLocalStorage } from '../../../utils'
import { useNavigate } from 'react-router-dom';
export default function SignupPage() {
    const navigate = useNavigate();
    const handleUserSignup = async (values) => {
        try {
            const { name, email, phoneNumber, gender, password } = values;
            const bodyData = {
                name,
                email,
                phoneNumber,
                gender,
                password,
                role: 'user'
            }
            const { data: { data, msg } } = await axios.post('http://localhost:5000/api/signup', bodyData);
            setLocalStorage('token', data.token);
            setLocalStorage('user', JSON.stringify(data));
            toast.success(msg);
            navigate('/');
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!");
        }
    }
    return (
        <SignUp
            handleUserSignup={handleUserSignup}
        />
    );
}