import React, { useState } from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import EmployeeTable from '../components/HomePage/EmployeeTable'
import Navbar from '../components/Navbar'

const Home = () => {
    const [loading, setLoading] = useState(false)
    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <Navbar />
                        <div className="flex flex-col items-center px-4 py-8 w-full">
                            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-4">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0"> Audit table</h1>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition">
                                    <Link to='/add'>
                                        Add Employee
                                    </Link>
                                </button>
                            </div>
                            <EmployeeTable setLoading={setLoading} />
                        </div>
                    </>
                )}
        </>
    )
}

export default Home
