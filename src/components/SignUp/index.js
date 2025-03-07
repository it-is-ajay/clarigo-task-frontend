import { Formik } from 'formik';
import './signup.scss';
import validationSchema from './validation';
import { Link } from 'react-router-dom';
export default function SignUp({
    handleUserSignup
}) {
    const initialValues = {
        name: '',
        email: '',
        phoneNumber: '',
        gender: 'male',
        password: '',
    }
    return <>
        <div className='signup'>
            <div className='signup_container'>
                <div className='signup_container_header'>
                    <label>Signup To Your Account</label>
                </div>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validationSchema()}
                    onSubmit={(values) => {
                        handleUserSignup(values);
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

                                {/* <input
                                    type="gender"
                                    name="gender"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.gender}
                                    placeholder='Enter Your Gender'
                                /> */}
                                <select name='gender' onChange={handleChange} onBlur={handleBlur}>
                                    <option >male</option>
                                    <option >female</option>
                                </select>
                                <span className='errorMsg'>
                                    {errors.gender && touched.gender && errors.gender}
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
                            <div className='signup_container_form_footer'>
                                <Link to='/login'>Already have an account</Link>
                                <button>Sign Up</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    </>
}