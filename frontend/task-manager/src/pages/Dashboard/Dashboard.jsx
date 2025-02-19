import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import TaskCard from "../../components/Cards/TaskCard";
import { MdAdd, MdDelete} from "react-icons/md";
import AddEditTasks from "./AddEditTasks";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import DeleteWarningModal from "../../components/DeleteWarningModal/DeleteWarningModal";
import EmptyCard from "../../components/Cards/EmptyCard";

const Dashboard = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState ({
        isShown: false,
        message: "",
        type: "add",
    });

    const [allTasks, setallTasks] = useState([])
    const [userInfo, setUserInfo] = useState(null);
    const [deleteModal, setDeleteModal] = useState({
        isShow: false,
        task: null,
    })
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (taskDetails) => {
        setOpenAddEditModal({
            isShow: true,
            type: "edit",
            data: taskDetails,
        });
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        });
    };

    //Get User Info
    const getUserInfo = async() => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401){
                localStorage.clear()
                navigate("/login");
            }
        }
    };

    //Get all tasks
    const getAllTasks = async () => {
        try{
            const response = await axiosInstance.get("/get-all-tasks");


                if (response.data && response.data.tasks) {
                    setallTasks(response.data.tasks);
                }

            } catch (error) {
                console.log("An unexpected error occured. Please try again");
            }
        };
    //Delete Task
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

    const cancelDelete = () => {
        setDeleteModal({
            isShow: false,
            task: null,
        });
    };

    const deleteTask = async (data) => {
        const taskId = data._id
        try {
            const response = await axiosInstance.delete("/delete-task/" + taskId);

            if(response.data && !response.data.error){
                showToastMessage("Task deleted successfully", 'delete');
                getAllTasks();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                console.log("An unexpected error occured. Please try again");
            }
        }
    }

    //Search Task
    const onSearchTask = async (query) => {
        try {
            const response = await axiosInstance.get("/search-tasks", {
                params: {query},
            });

            if (response.data && response.data.tasks) {
                setIsSearch(true);
                setallTasks(response.data.tasks);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllTasks();
    };

    //Update isPinned Value

    const updateisPinned = async (task) => {
        const taskId = task._id;

        try {
            const response = await axiosInstance.put("/update-task-pinned/" + taskId, {
                isPinned: !task.isPinned,
            });

            if (response.data && response.data.task) {
                showToastMessage("Task updated successfully", "update");
                getAllTasks();
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getAllTasks();
        getUserInfo();
        return () => {};
    }, []);

    return (
        <>
            <Navbar userInfo = {userInfo} onSearchTask={onSearchTask} handleClearSearch={handleClearSearch}/>
                <div className="container mx-auto px-60 mt-15 space-y-5 relative">
                    <button 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-lime-500 hover:bg-lime-400 hover:shadow-md hover:shadow-slate-400 absolute left-45" 
                    onClick={() => {
                        setOpenAddEditModal({
                            isShow: true,
                            type: "add",
                            data: null,
                        });
                    }}>
                    <MdAdd className="text-[32px] text-white" />
                    </button>
                    <button className = "w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500 hover:bg-red-600 hover:shadow-md hover:shadow-slate-400 absolute left-45 top-15">
                    <MdDelete className="text-[28px] text-white" />
                    </button>
                    {allTasks.length > 0 ? (<div className = "space-y-5">
                    {allTasks.map((item, index) => (
                    <TaskCard 
                        key={item._id}
                        title={item.title}
                        date={item.createdOn}
                        content={item.content}
                        tags={item.tags}
                        isPinned={item.isPinned}
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                        onPinNote={() => updateisPinned(item)}
                        />))}
                </div> ) : ( 
                    <EmptyCard /> 
                )}
            </div>
            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }
                }}
                contentLabel="Add Edit Modal"
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 overflow-scroll"
            >
                <AddEditTasks 
                    type={openAddEditModal.type}
                    taskData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type:"add", data:null});
                    }}
                    getAllTasks = {getAllTasks}
                    showToastMessage = {showToastMessage}
                    />
            </Modal>

            <DeleteWarningModal
                isOpen={deleteModal.isShow}
                onRequestClose={cancelDelete}
                onConfirm={confirmDelete}
            />

            <Toast
                isShown = {showToastMsg.isShown}
                message = {showToastMsg.message}
                type = {showToastMsg.type}
                onClose = {handleCloseToast}
            />
        </>
    );
};
export default Dashboard;