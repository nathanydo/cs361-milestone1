import React from "react";
import Modal from "react-modal";

export const DeleteWarningModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            contentLabel="Delete Confirmation Modal"
            className="w-100 max-h-xl bg-white rounded-md mx-auto mt-20 p-5"
        >
            <div className="text-center">
                <h2 className="text-xl font-medium text-black">Confirm Deletion</h2>
                <p className="text-slate-900 text-base ">
                    Are you sure you want to delete this task?
                </p>
                <p className="text-slate-900 text-base font-black">
                    This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200"
                        onClick={onRequestClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const DeleteAllWarningModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            contentLabel="Delete All Confirmation Modal"
            className="w-[30%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 overflow-scroll"
        >
            <div className="text-center">
                <h2 className="text-xl font-medium text-black">Confirm Deletion</h2>
                <p className="text-slate-900 text-base">
                    Are you sure you want to delete all tasks?
                </p>
                <h1 className="text-slate-900 text-base  font-black">
                    This action cannot be undone.
                </h1>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete All
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200"
                        onClick={onRequestClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};
