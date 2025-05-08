import React, { useState } from 'react';
import { EmployeeSchema } from '../validation/employeeSchema';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { sendEmployDetails } from '../Apis/Employ';
import { toast } from 'react-toastify';

const EmployeeForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const initialValues = {
        name: '',
        email: '',
        position: '',
        joiningDate: ''
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: EmployeeSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                console.log(values, '-------values')
                // const { data } = await sendEmployDetails(values)
                // console.log(data, '------------------ett')
                toast.success("Files uploaded successfully")
                navigate('/')
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error, 'data failed');
            }
            action.resetForm();
            console.log('before reset')
            setLoading(false)
        }
    })

    return (
        <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 Employee Entry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'position', 'joiningDate'].map((field) => (
                    <div key={field}>
                        <label className="block text-gray-700 font-medium mb-1 capitalize" htmlFor={field}>
                            {field === 'joiningDate' ? 'Joining Date' : field}
                        </label>
                        <input
                            id={field}
                            name={field}
                            type={field === 'email' ? 'email' : field === 'joiningDate' ? 'date' : 'text'}
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
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
