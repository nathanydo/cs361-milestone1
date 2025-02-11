import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import TaskCard from "../../components/Cards/TaskCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Dashboard = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });


    return (
        <>
            <Navbar />
                <div className="container mx-auto px-60 mt-10 relative">
                    <button 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-400 hover:bg-slate-600 absolute left-45" 
                    onClick={() => {
                        setOpenAddEditModal({
                            isShow: true,
                            type: "add",
                            data: null,
                        });
                    }}>
                    <MdAdd className="text-[32px] text-white" />
                    </button>
                    <TaskCard 
                        title="Meeting on 7th April" 
                        date="3rd Apr 2024" 
                        content="Meeting on 7th April"
                        tags="#meeting"
                        isPinned={true}
                        onEdit={() => {}}
                        onDelete={() =>{}}
                        onPinNote={() => {}}
                        />
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
                <AddEditNotes 
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type:"add", data:null})
                    }}/>
            </Modal>
        </>
    );
}

export default Dashboard;