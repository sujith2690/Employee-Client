import * as Yup from 'yup';

export const EmployeeSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    position: Yup.string().required('Position is required'),
    salary: Yup.number()
        .typeError('Salary must be a number')
        .positive('Salary must be greater than zero')
        .min(20000, 'Salary must be at least ₹20,000')
        .max(8900000, 'Salary must not exceed ₹8,900,000')
        .required('Salary is required'),
    joiningDate: Yup.date()
        .required('Joining Date is required')
        .typeError('Please enter a valid date')
});
