import React, { useEffect, useState } from 'react'
import { getEmployeesApi } from '../Apis/Employ'
import { toast } from 'react-toastify'
import Loading from './Loading'
import { Link } from 'react-router-dom'

const Home = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchALlEmployees = async () => {
            try {
                const { data } = await getEmployeesApi()
                console.log(data, '------------------ett')
                setEmployees(data)
            } catch (error) {
                console.log(error, 'getting data failed');
                toast.error(error.response.data.message)
            }
        }
        fetchALlEmployees()
    }, [])

    return (
        <>
            {
                employees.length > 0 ? (
                    <div className="flex flex-col items-center px-4 py-8 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-4">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">All Employees</h1>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
                                <Link to='/add'>
                                    Add Employee
                                </Link>
                            </button>
                        </div>

                        <div className="overflow-x-auto w-full max-w-6xl">
                            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden bg-white">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Address</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Options</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {employees.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3">{employee.id}</td>
                                            <td className="px-4 py-3">{employee.title}</td>
                                            <td className="px-4 py-3">{employee.desc}</td>
                                            <td className="px-4 py-3">{employee.cover}</td>
                                            <td className="px-4 py-3">{employee.address}</td>
                                            <td className="px-4 py-3 space-x-2">
                                                <div className='flex space-x-2'>
                                                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition">
                                                        Update
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                ) : (
                    <div><Loading /></div>
                )
            }
        </>
    )
}

export default Home