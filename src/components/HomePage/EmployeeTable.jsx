
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteEmploy, getAllEmployees, searchEmployees } from '../../Apis/employApis';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import DataTable from 'react-data-table-component';

const EmployeeTable = ({ setLoading }) => {
    const [remove, setRemove] = useState(false);
    const [deleteData, setDeleteData] = useState();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');

    const fetchAllEmployees = async () => {
        try {
            const { data } = await getAllEmployees();
            console.log(data.details, '------------------all employee')
            setEmployees(data.details);
            setFilteredEmployees(data.details);
            setLoading(false);
        } catch (error) {
            console.log(error, 'getting data failed');
            toast.error(error.response?.data?.message || "Error fetching data");
        } finally {
            setLoading(false); // End loading
        }
    };


    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = (data) => {
        setRemove(true);
        setDeleteData(data);
    };

    const handleRemove = async (id) => {
        try {
            await deleteEmploy(id);
            fetchAllEmployees();
            toast.success("Deleted");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error, 'Deleting failed');
        }
        setRemove(false);
    };

    const handleClose = (e) => {
        if (e.target.id === "container") {
            setRemove(false);
        }
    };

    const fetchFilteredEmployees = async () => {
        try {
            const paramsData = {
                search: searchTerm,
                minSalary: minSalary || undefined,
                maxSalary: maxSalary || undefined,
            };
            console.log(paramsData, '------------paramsData')
            const { data } = await searchEmployees(paramsData);
            console.log(data, '---------------data')
            setFilteredEmployees(data);
        } catch (error) {
            console.error("Error fetching filtered employees:", error);
            // toast.error(error.response?.data?.message || "Failed to fetch data");
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchFilteredEmployees();
        }, 500); // debounce delay

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, minSalary, maxSalary]);

    const columns = [
        { name: "No", selector: (_, index) => index + 1, width: "50px" },
        { name: "Name", selector: (employee) => employee.name, sortable: true },
        { name: "Email", selector: (employee) => employee.email },
        { name: "Phone", selector: (employee) => employee.phoneNumber },
        { name: "Address", selector: (employee) => employee.address },
        { name: "Position", selector: (employee) => employee.position },
        { name: "Joining Date", selector: (employee) => employee.joiningDate },
        { name: "Added By", selector: (employee) => employee.createdBy },
        {
            name: "Updated By",
            selector: (employee) => {
                let updatedByList = [];
                try {
                    // Parse the string to JSON
                    const parsed = JSON.parse(employee.updatedBy);
                    if (Array.isArray(parsed)) {
                        updatedByList = parsed;
                    }
                } catch (err) {
                    // If parsing fails, use an empty array
                    updatedByList = [];
                }

                return (
                    <div className="flex space-x-2 flex-wrap">
                        {updatedByList.map((user, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-800"
                            >
                                {user}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        { name: "Salary", selector: (employee) => employee.salary },
        {
            name: "Options",
            cell: row => (
                <div className="flex flex-col space-x-2 gap-2 p-2">
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-sm w-full"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => handleDelete(row)}
                        className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];


    return (
        <>
            <div className="mb-4 flex flex-wrap gap-4 items-center w-full justify-end  max-w-7xl">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search employees..."
                    className="px-4 py-2 border rounded-md w-64"
                />
                <input
                    type="number"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    placeholder="Min Salary"
                    className="px-4 py-2 border rounded-md w-40"
                />
                <input
                    type="number"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    placeholder="Max Salary"
                    className="px-4 py-2 border rounded-md w-40"
                />
            </div>

            <div className="overflow-x-auto w-full max-w-7xl">
                <DataTable
                    columns={columns}
                    data={filteredEmployees}
                    pagination
                    highlightOnHover
                    responsive
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    customStyles={{
                        headCells: {
                            style: {
                                backgroundColor: '#4B5563',
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        }
                    }}
                />
            </div>

            {remove && (
                <ConfirmDeleteModal
                    remove={remove}
                    setRemove={setRemove}
                    deleteData={deleteData}
                    handleRemove={handleRemove}
                />
            )}
        </>
    );
};

export default EmployeeTable;
