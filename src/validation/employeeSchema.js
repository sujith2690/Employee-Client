import * as Yup from 'yup';

export const EmployeeSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .matches(
            /^(\+?[0-9]{1,4}[\s-])?(\(?\d{1,3}\)?[\s-])?[\d\s-]{5,10}$/,
            'Phone number is not valid'
        )
        .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    position: Yup.string().required('Position is required'),
    salary: Yup.number()
        .typeError('Salary must be a number')
        .positive('Salary must be greater than zero')
        .required('Salary is required'),
    joiningDate: Yup.date()
        .required('Joining Date is required')
        .typeError('Please enter a valid date')
});
