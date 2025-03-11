import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { MdAdd, MdDelete } from "react-icons/md";
import AddEditTasks from "./AddEditTasks";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import { DeleteWarningModal, DeleteAllWarningModal } from "../../components/DeleteWarningModal/DeleteWarningModal";
import TaskCard from "../../components/Cards/TaskCard";
import EmptyCard from "../../components/Cards/EmptyCard";
import TaskViewModal from "../../components/Cards/ViewTask";
import tripleBamboo from "../../assets/images/triple_bamboo.webp";
import useUserInfo from '../../utils/useUserInfo';
import SideMenu from '../../components/SideMenu/SideMenu';
import { showToast } from '../../utils/toastService';


const Tasks = () => {

    const userInfo = useUserInfo()
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });

    const [allTasks, setallTasks] = useState([]);
    const [viewTaskModal, setViewTaskModal] = useState({
        isShow: false,
        task: null,
    });
    const [deleteModal, setDeleteModal] = useState({
        isShow: false,
        task: null,
    });
    const [deleteAllModal, setDeleteAllModal] = useState(false);

    const getAllTasks = async () => {
        try {
            const response = await axiosInstance.get("/get-all-tasks");
            if (response.data && response.data.tasks) {
                setallTasks(response.data.tasks);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
    };

    const getTask = async (taskId) => {
        try {
            const response = await axiosInstance.get("/get-task/" + taskId);
            if (response.data && response.data.tasks) {
                setViewTaskModal({
                    isShow: true,
                    task: response.data.tasks,
                });
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
    };

    const handleEdit = (taskDetails) => {
        setOpenAddEditModal({
            isShow: true,
            type: "edit",
            data: taskDetails,
        });
    };

    const handleDelete = (task) => {
        setDeleteModal({
            isShow: true,
            task,
        });
    };

    const confirmDelete = () => {
        if (deleteModal.task) {
            deleteTask(deleteModal.task);
            setDeleteModal({
                isShow: false,
                task: null,
            });
        }
    };

    const confirmDeleteAll = () => {
        deleteAllTasks();
        setDeleteAllModal(false);
    };

    const cancelDelete = () => {
        setDeleteModal({
            isShow: false,
            task: null,
        });
    };

    const deleteTask = async (data) => {
        const taskId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-task/" + taskId);
            if (response.data && !response.data.error) {
                showToast("Task deleted successfully", 'delete');
                getAllTasks();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
    };

    const deleteAllTasks = async () => {
        try {
            const response = await axiosInstance.delete("/delete-all-tasks");
            if (response.data && !response.data.error) {
                showToast("All tasks deleted successfully", "delete");
                getAllTasks();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        });
    };


    const updateisPinned = async (task) => {
        const taskId = task._id;
        try {
            const response = await axiosInstance.put("/update-task-pinned/" + taskId, {
                isPinned: !task.isPinned,
            });
            if (response.data && response.data.task) {
                showToast("Task updated successfully", "update");
                getAllTasks();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTasks();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className="flex flex-row mt-10 justify-center">
                <div>
                    <SideMenu />
                </div>
            <div className="container mx-20 mt-15 space-y-5 max-w-2xl">
                <div className="flex items-center gap-4">
                    <button
                        className="w-18 h-12 flex items-center justify-center rounded-2xl bg-lime-500 hover:bg-lime-400 hover:shadow-md hover:shadow-slate-400 transition-all ease-in-out"
                        onClick={() => {
                            setOpenAddEditModal({
                                isShow: true,
                                type: "add",
                                data: null,
                            });
                        }}
                    >
                        <MdAdd className="text-[32px] text-white" />
                    </button>
                    {allTasks.length > 0 && (
                        <div>
                            <button
                                className="w-18 h-12 flex items-center justify-center rounded-2xl bg-red-500 hover:bg-red-700 hover:shadow-md hover:shadow-slate-400 transition-all ease-in-out"
                                onClick={() => setDeleteAllModal(true)}
                            >
                                <MdDelete className="text-[28px] text-white" />
                            </button>
                        </div>
                    )}
                </div>
                {allTasks.length > 0 ? (
                    <div className="space-y-5 pb-50">
                        {allTasks.map((item, index) => (
                            <TaskCard
                                key={item._id}
                                title={item.title}
                                date={item.createdOn}
                                dueDate={item.dueDate}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item)}
                                onPinNote={() => updateisPinned(item)}
                                onView={() => getTask(item._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCard
                        imgSrc={tripleBamboo}
                        message={
                            <p className="whitespace-pre-wrap">
                                You have no task! If needed, click the          above to start organizing your day! Let's get organized!
                                <button className="w-5 h-5 flex items-center justify-center bg-lime-500 text-white rounded-md relative left-67.5 bottom-12">
                                    <MdAdd className="text-[24px] text-white" />
                                </button>
                            </p>
                        }
                    />
                )}
                </div>
                <Modal
                    isOpen={openAddEditModal.isShow}
                    onRequestClose={() => {}}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                    }}
                    contentLabel="Add Edit Modal"
                    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 overflow-scroll"
                >
                    <AddEditTasks
                        type={openAddEditModal.type}
                        taskData={openAddEditModal.data}
                        onClose={() => {
                            setOpenAddEditModal({ isShown: false, type: "add", data: null });
                        }}
                        getAllTasks={getAllTasks}
                        showToastMessage={showToastMessage}
                    />
                </Modal>

                <DeleteWarningModal isOpen={deleteModal.isShow} onRequestClose={cancelDelete} onConfirm={confirmDelete} />

                <DeleteAllWarningModal isOpen={deleteAllModal} onRequestClose={() => setDeleteAllModal(false)} onConfirm={confirmDeleteAll} />

                <TaskViewModal
                    isOpen={viewTaskModal.isShow}
                    onRequestClose={() => setViewTaskModal({ isShow: false, task: null })}
                    task={viewTaskModal.task}
                    onEdit={() => handleEdit(viewTaskModal.task)}
                />
                <Toast />
            </div>
        </>
    );
};

export default Tasks;
