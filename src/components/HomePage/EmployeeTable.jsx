import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllEmployees } from '../../Apis/Employ'
import Pagination from './Pagination'

const EmployeeTable = ({ setLoading }) => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const { data } = await getAllEmployees()
                console.log(data, '------------------ett')
                setEmployees(data)
            } catch (error) {
                console.log(error, 'getting data failed');
                toast.error(error.response?.data?.message || "Error fetching data")
            } finally {
                setLoading(false)
            }
        }
        fetchAllEmployees()
    }, [])
    return (
        <>
            <div className="overflow-x-auto w-full max-w-7xl">
                <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden bg-white">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-12">No</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-48">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Phone</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-64">Address</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-40">Position</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Joining Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Added By</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Updated By</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-24">Salary</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-32">Options</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-600">No employees available</td>
                            </tr>
                        ) : (
                            employees.map((employee, i) => (
                                <tr key={employee.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">{i + 1}</td>
                                    <td className="px-4 py-3">{employee.name}</td>
                                    <td className="px-4 py-3">{employee.email}</td>
                                    <td className="px-4 py-3">{employee.phoneNumber}</td>
                                    <td className="px-4 py-3">{employee.address}</td>
                                    <td className="px-4 py-3">{employee.position}</td>
                                    <td className="px-4 py-3">{employee.joiningDate}</td>
                                    <td className="px-4 py-3">{employee.createdBy}</td>
                                    <td className="px-4 py-3">{employee.updatedBy}</td>
                                    <td className="px-4 py-3">{employee.salary}</td>
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination />
        </>
    )
}

export default EmployeeTable