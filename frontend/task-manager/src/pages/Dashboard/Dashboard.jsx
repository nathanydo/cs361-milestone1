import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import SideMenu from "../../components/SideMenu/SideMenu";
import TaskCard from "../../components/Cards/TaskCard";
import EmptyCard from "../../components/Cards/EmptyCard";
import TaskViewModal from "../../components/Cards/ViewTask";
import Modal from "react-modal";
import AddEditTasks from "../Tasks/AddEditTasks";
import tripleBamboo from "../../assets/images/triple_bamboo.webp";
import useUserInfo from "../../utils/useUserInfo";
import { showToast } from "../../utils/toastService";
import Toast from "../../components/ToastMessage/Toast";

const Dashboard = () => {
    const userInfo = useUserInfo();
    const [allTasks, setAllTasks] = useState([]);
    const [viewTaskModal, setViewTaskModal] = useState({
        isShow: false,
        task: null,
    });
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });
    const [isSearch, setIsSearch] = useState(false);

    const getAllTasks = async () => {
        try {
            const response = await axiosInstance.get("/get-all-tasks");
            if (response.data && response.data.tasks) {
                setAllTasks(response.data.tasks);
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

    // Complete Tasks
    // const handleDelete = (task) => {
    //     setDeleteModal({
    //         isShow: true,
    //         task,
    //     });
    // };


    const deleteTask = async (data) => {
        const taskId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-task/" + taskId);
            if (response.data && !response.data.error) {
                showToast("Task completed successfully", 'success');
                getAllTasks();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
    };

    // Search Tasks
    const onSearchTask = async (query) => {
        try {
            const response = await axiosInstance.get("/search-tasks", {
                params: { query },
            });

            if (response.data && response.data.tasks) {
                setIsSearch(true);
                setAllTasks(response.data.tasks);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllTasks();
    };

    const updateIsPinned = async (task) => {
        const taskId = task._id;
        try {
            const response = await axiosInstance.put("/update-task-pinned/" + taskId, {
                isPinned: !task.isPinned,
            });
            if (response.data && response.data.task) {
                showToast("Task pinned successfully", "update");
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
            <Navbar userInfo={userInfo} onSearchTask={onSearchTask} handleClearSearch={handleClearSearch} />
            <div className="flex flex-row mt-10 justify-center">
                <div className="">
                    <SideMenu />
                </div>
                <div className="container mx-20 mt-15 space-y-5 max-w-2xl">
                    {allTasks.length > 0 ? (
                        <div className="space-y-5 pb-50">
                            {allTasks.map((item) => (
                                <TaskCard
                                    key={item._id}
                                    title={item.title}
                                    date={item.createdOn}
                                    dueDate={item.dueDate}
                                    content={item.content}
                                    tags={item.tags}
                                    isPinned={item.isPinned}
                                    onPinNote={() => updateIsPinned(item)}
                                    onView={() => getTask(item._id)}
                                    onEdit={() => handleEdit(item)} // Pass handleEdit to TaskCard
                                    onDelete={() => deleteTask(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyCard
                            imgSrc={tripleBamboo}
                            message={
                                <>
                                    <p className="whitespace-pre-wrap text-xl">
                                        Nothing to see here!
                                    </p>
                                    <p>Need a new task? Go to the Task Page to create one!</p>
                                </>
                            }
                        />
                    )}
                </div>
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
                        showToastMessage={showToast}
                    />
                </Modal>
            <TaskViewModal
                isOpen={viewTaskModal.isShow}
                onRequestClose={() => setViewTaskModal({ isShow: false, task: null })}
                task={viewTaskModal.task}
                onEdit={() => handleEdit(viewTaskModal.task)} // Call handleEdit when edit button is clicked
            />
            <Toast />
        </>
    );
};

export default Dashboard;