
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingContent from '../LoadingContent';
import { loginSchema } from '../../validation/authSchema';
import { logInApi } from '../../Apis/AuthApis';


const LoginForm = ({ handleLogin }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const initialValues = formValues
    const validationSchema = loginSchema
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                console.log(values, 'login values')
                const { data } = await logInApi(values)
                console.log(data,'-------------------login data')
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success(data.message)
                navigate('/')
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error, 'Login failed');
            }
            action.resetForm();
            console.log('before reset')
            setLoading(false)
        }
    })
    return (

        <div className="w-full max-w-md p-8 space-y-1 rounded-xl  ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="space-y-1 text-sm">
                    <label htmlFor="username" className="block  text-start">Username</label>
                    <input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"

                        className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-default-600" />
                    {errors.email && touched.email ? (
                        <p className="text-red-600 text-center text-sm">{errors.email}</p>
                    ) : null}
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block  text-start">Password</label>
                    <input
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-default-600" />
                    {errors.password && touched.password ? (
                        <p className="text-red-600 text-center text-sm">{errors.password}</p>
                    ) : null}
                </div>
                {loading ?
                    <div className="p-2 bg-blue-600 flex items-center justify-center rounded">
                        <LoadingContent />
                    </div> : <div className="">
                        <button
                            type='submit'
                            className="block w-full p-3 text-center rounded-sm bg-blue-600 cursor-pointer text-white">Sign in</button>

                    </div>}
            </form>

            <p className="text-xs text-center sm:px-6 " onClick={handleLogin} >Don't have an account?
                <a rel="noopener noreferrer" href="#" className="underline dark:text-gray-800"> Sign up</a>
            </p>
        </div>

    )
}

export default LoginForm