import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { EmployeeSchema } from '../validation/employeeSchema';
import { useNavigate } from 'react-router-dom';
import { sendEmployDetails } from '../Apis/Employ';
import { toast } from 'react-toastify';

const EmployeeForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);
        if (!user) {
            navigate('/login');
        }
    }, []);

    const employeeData = ['name', 'email', 'phoneNumber', 'joiningDate', 'position', 'salary', 'address'];

    const initialValues = {
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        position: '',
        joiningDate: '',
        createdBy: '',
        updatedBy: '',
        salary: '',
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues,
        validationSchema: EmployeeSchema,
        onSubmit: async (values, action) => {
            setLoading(true);
            try {
                console.log(userData.id,'----------userData')
                const payload = {
                    ...values,
                    createdBy: userData?.name || 'anonymous',
                    // updatedBy: userData?.name || 'anonymous',
                };
                console.log(payload, '-------payload to send');
                const { data } = await sendEmployDetails(payload);
                toast.success('Employee added successfully');
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Something went wrong');
                console.error('Submit failed:', error);
            }
            action.resetForm();
            setLoading(false);
        },
    });

    return (
        <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 Employee Entry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Group fields in pairs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {employeeData.map((field, index) => {
                        // Skip pairing for address
                        if (field === 'address') {
                            return (
                                <div key={field} className="col-span-1 sm:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-1 capitalize" htmlFor={field}>
                                        Address
                                    </label>
                                    <textarea
                                        id={field}
                                        name={field}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values[field]}
                                        rows={4}
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none ${touched[field] && errors[field]
                                            ? 'border-red-500'
                                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                            }`}
                                    />
                                    {touched[field] && errors[field] && (
                                        <div className="text-red-500 text-sm mt-1">{errors[field]}</div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={field}>
                                <label className="block text-gray-700 font-medium mb-1 capitalize" htmlFor={field}>
                                    {field === 'joiningDate' ? 'Joining Date' : field}
                                </label>
                                <input
                                    id={field}
                                    name={field}
                                    type={field === 'email' ? 'email' : field === 'joiningDate' ? 'date' : field === 'salary' ? 'number' : 'text'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[field]}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${touched[field] && errors[field]
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        }`}
                                />
                                {touched[field] && errors[field] && (
                                    <div className="text-red-500 text-sm mt-1">{errors[field]}</div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
