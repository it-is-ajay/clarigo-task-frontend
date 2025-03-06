import * as yup from 'yup'

const validationSchema = () => {
    return yup.object().shape({
        name: yup
            .string()
            .required('Name is required'),
        phoneNumber: yup
            .number('Phone number must be a number')
            .required('Phone number is required'),
    })
};

export default validationSchema;