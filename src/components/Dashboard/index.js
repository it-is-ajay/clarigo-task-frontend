import './dashboard.scss';
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../utils";
import { Modal, Table } from 'antd';
import { useState } from 'react';
import { Formik } from 'formik';
import validationSchema from './validation';
import createUserSchema from '../../components/SignUp/validation';

export default function Dashboard({
    userList,
    deleteUser,
    updateUser,
    handleCreateUser,
}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [createUserModal, setCreateUserModal] = useState(false);
    const handleLogout = () => {
        removeLocalStorage('user');
        removeLocalStorage('token');
        navigate('/login');
    }

    const initialValues = {
        name: '',
        email: '',
        phoneNumber: '',
        gender: 'male',
        password: '',
    }



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'Phone Number',
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            key: 'Gender',
        },
        {
            title: 'other',
            dataIndex: 'other',
            key: 'Gender',
            render: (_, record) => {
                return <div>
                    <button onClick={() => { deleteUser(record._id) }} className='delete-user-btn'>Delete</button>
                    <button onClick={() => {
                        setOpen(true)
                        setCurrentUser(record);
                    }} className='update-user-btn'>Update</button>
                </div>
            }
        },
    ];
    return (
        <div className="dashboard">
            <div className="dashboard_container">
                <div className="dashboard_container_header">
                    <header>
                        <button className='logout-btn' onClick={handleLogout}>Logout</button>
                        <button onClick={() => setCreateUserModal(true)} className='create-user-btn'>Create User</button>
                    </header>
                    <label>
                        Admin Dashboard
                    </label>
                </div>
                <div className='dashboard_container_description'>
                    Manage your user and setting here.
                </div>
                <div className="dashboard_container_body">
                    <br />
                    <Table dataSource={userList} columns={columns} />;
                </div>
            </div>
            <Modal
                title="Update User"
                centered
                open={open}
                onCancel={() => {
                    setOpen(false)
                    setCurrentUser(null);
                }}
                footer={null}
                width={600}
            >
                <Formik
                    initialValues={{
                        name: currentUser?.name || '',
                        phoneNumber: currentUser?.phoneNumber || '',
                    }}
                    enableReinitialize
                    validationSchema={validationSchema()}
                    onSubmit={(values) => {
                        updateUser(currentUser?._id, values);
                        setCurrentUser(null);
                        setOpen(false);
                        console.log(values, 'values')
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        /* and other goodies */
                    }) => (
                        <form className='login_container_form' onSubmit={handleSubmit}>
                            <div className='login_container_form_body'>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    disabled
                                    value={currentUser?.email || ""}
                                />
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder='Enter your name'
                                />
                                <span className='errorMsg'>
                                    {errors.name && touched.name && errors.name}
                                </span>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phoneNumber}
                                    placeholder='Enter phone number'
                                />
                                <span className='errorMsg'>
                                    {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                                </span>

                            </div>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: '20px'
                            }}>
                                <button onClick={() => setOpen(false)} style={{
                                    marginRight: '20px'
                                }}>
                                    Cancel
                                </button>
                                <button type='submit'>
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Modal>
            <Modal
                title="Create User"
                centered
                open={createUserModal}
                onCancel={() => {
                    setOpen(false)
                    setCreateUserModal(null);
                }}
                footer={null}
                width={600}
            >
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={createUserSchema()}
                    onSubmit={(values) => {
                        handleCreateUser(values);
                        console.log(values, 'values')
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        /* and other goodies */
                    }) => (
                        <form className='signup_container_form' onSubmit={handleSubmit}>
                            <div className='signup_container_form_body'>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder='Enter Your Name'
                                />
                                <span className='errorMsg'>{errors.name && touched.name && errors.name}</span>

                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder='Enter Your Email'
                                />
                                <span className='errorMsg'>
                                    {errors.email && touched.email && errors.email}
                                </span>

                                <input
                                    type="phoneNumber"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phoneNumber}
                                    placeholder='Enter Your Phone Number'
                                />
                                <span className='errorMsg'>

                                    {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                                </span>
                                <select name='gender' onChange={handleChange} onBlur={handleBlur}>
                                    <option >male</option>
                                    <option >female</option>
                                </select>
                                <span className='errorMsg'>
                                    {errors.gender && touched.gender && errors.gender}
                                </span>

                                <input
                                    type="text"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder='Enter Your Password'
                                />
                                <span className='errorMsg'>
                                    {errors.password && touched.password && errors.password}
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: '20px'
                            }}>
                                <button onClick={() => setCreateUserModal(false)} style={{
                                    marginRight: '20px'
                                }}>
                                    Cancel
                                </button>
                                <button type='submit'>
                                    Create
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}