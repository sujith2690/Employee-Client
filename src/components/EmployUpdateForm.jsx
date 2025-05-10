import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployDetails, updateEmployDetails } from '../Apis/employApis';
import { useFormik } from 'formik';
import { EmployeeSchema } from '../validation/employeeSchema'; // ensure this schema is defined properly
import { toast } from 'react-toastify'; // Optional: if using toast for notifications

const EmployUpdateForm = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchEmployeeDetails = async () => {
            try {
                const { data } = await getEmployDetails(id);
                const formattedData = {
                    ...data,
                    joiningDate: new Date(data.joiningDate).toISOString().split('T')[0], // ➜ "yyyy-MM-dd"
                };
                setInitialValues(formattedData);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployeeDetails();
    }, [id, navigate]);

    const formik = useFormik({
        initialValues: initialValues || {
            name: '',
            phoneNumber: '',
            email: '',
            joiningDate: '',
            salary: '',
            address: '',
        },
        enableReinitialize: true,
        validationSchema: EmployeeSchema,
        onSubmit: async (values, actions) => {
            setLoading(true);
            try {
                const payload = {
                    ...values,
                    updatedBy: userData?.name || 'anonymous',
                };
                console.log(id,'----------employ id')
                console.log(payload,'----------payload')
                const { data } = await updateEmployDetails(id, payload);
                toast.success('Employee updated successfully');
                navigate('/'); // redirect after success
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Something went wrong');
                console.error('Submit failed:', error);
            }
            setLoading(false);
        },
    });

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = formik;

    if (!initialValues) return <div className="text-center mt-10">Loading employee data...</div>;

    return (
        <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 Update Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                        {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                        {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Joining Date</label>
                        <input
                            type="date"
                            name="joiningDate"
                            value={values.joiningDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                        {touched.joiningDate && errors.joiningDate && (
                            <p className="text-red-500 text-sm">{errors.joiningDate}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={values.position}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                        {touched.position && errors.position && (
                            <p className="text-red-500 text-sm">{errors.position}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={values.salary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                        {touched.salary && errors.salary && (
                            <p className="text-red-500 text-sm">{errors.salary}</p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 mb-1">Address</label>
                    <textarea
                        name="address"
                        rows="4"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    {touched.address && errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployUpdateForm;
