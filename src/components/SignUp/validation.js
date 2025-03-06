import * as yup from 'yup'

const validationSchema = () => {
    return yup.object().shape({
        name: yup
            .string()
            .required('Name is required'),
        email: yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
        phoneNumber: yup
            .number('Phone number must be a number')
            .required('Phone number is required'),
        gender: yup
            .string()
            .required('Phone number is required'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    })
};

export default validationSchema;