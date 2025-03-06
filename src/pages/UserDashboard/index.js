import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../utils"

export default function UserDashboard() {

    const navigate = useNavigate();
    const handleLogout = () => {
        removeLocalStorage('user');
        removeLocalStorage('token');
        navigate('/login');
    }
    return <>
        <button onClick={handleLogout}>logout</button>
        User Dashboard
    </>
}