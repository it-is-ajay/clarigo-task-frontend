import { Formik } from 'formik';
import './login.scss';
import validationSchema from './validation';
import { Link } from 'react-router-dom';
export default function login({
    handleUserLogin
}) {
    const initialValues = {
        email: '',
        password: '',
    }
    return <>
        <div className='login'>
            <div className='login_container'>
                <div className='login_container_header'>
                    <label>SingIn To Your Account</label>
                </div>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validationSchema()}
                    onSubmit={(values) => {
                        handleUserLogin(values);
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
                                    type="password"
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
                            <div className='login_container_form_footer'>
                                <Link to='/signup'>Doesn't have an account</Link>
                                <button>Sign In</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    </>
}