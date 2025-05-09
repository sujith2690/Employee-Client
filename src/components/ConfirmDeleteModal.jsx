import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmDeleteModal = ({ remove, setRemove, deleteData, handleRemove }) => {

    const handleClose = (e) => {
        if (!e || e.target.id === "container") {
            setRemove(false);
        }
    };

    const handleRemoveCancel = () => {
        handleClose();
    };

    return (
        remove && (
            <div
                id="container"
                onClick={handleClose}
                className="fixed inset-0 bg-white/50 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                    <div className="flex justify-end text-2xl mb-3">
                        <div
                            onClick={handleRemoveCancel}
                            className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-amber-200 hover:bg-amber-300 transition"
                        >
                            <IoClose />
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <p className="text-xl font-semibold text-gray-700">
                            Please confirm that you want to delete the below Employee data
                        </p>

                        <div className="space-y-1 text-left text-sm p-2">
                            <p>
                                <span className="font-semibold text-gray-700">Name:</span>{' '}
                                <span className="text-blue-600">{deleteData.name}</span>
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Email:</span>{' '}
                                <span className="text-blue-600">{deleteData.email}</span>
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Phone:</span>{' '}
                                <span className="text-blue-600">{deleteData.phoneNumber}</span>
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Address:</span>{' '}
                                <span className="text-blue-600">{deleteData.address}</span>
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700">Position:</span>{' '}
                                <span className="text-blue-600">{deleteData.position}</span>
                            </p>
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                onClick={()=>handleRemove(deleteData.id)}
                                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleRemoveCancel}
                                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ConfirmDeleteModal;
