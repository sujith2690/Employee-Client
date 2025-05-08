import * as Yup from 'yup';

export const EmployeeSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    position: Yup.string()
        .required('Position is required'),
    joiningDate: Yup.date()
        .required('Joining Date is required')
        .typeError('Please enter a valid date'),
});
