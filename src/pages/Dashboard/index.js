import { toast } from 'react-toastify';
import Dashboard from '../../components/Dashboard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { getLocalStorage } from '../../utils';

export default function DashboardPage() {
    const [userList, setUserList] = useState([]);
    const token = getLocalStorage('token');
    const getUserList = async () => {
        try {
            const { data: { data } } = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json", 
                }
            });
            setUserList(data);
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!");
        }
    }

    const deleteUser = async (id) => {
        try {
            const { data: { msg } } = await axios.delete(`http://localhost:5000/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json", 
                }
            });
            toast.success(msg);
            await getUserList();
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!");
        }
    }

    const updateUser = async (id, body) => {
        try {
            const { data: { msg } } = await axios.put(`http://localhost:5000/api/user/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json", 
                },
            });
            toast.success(msg);
            await getUserList();
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!");
        }
    }

    const adminCreateUser = async (values) => {
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
            const { data: { msg } } = await axios.post('http://localhost:5000/api/create-user', bodyData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json", 
                },
            });
            await getUserList();
            toast.success(msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Something went wrong!");
        }
    }


    useEffect(() => {
        getUserList();
    }, [])
    return (
        <div>
            <Dashboard
                userList={userList}
                deleteUser={deleteUser}
                updateUser={updateUser}
                handleCreateUser={adminCreateUser}
            />
        </div>
    );
}