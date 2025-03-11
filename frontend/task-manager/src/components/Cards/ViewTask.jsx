import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { MdClose, MdCreate} from "react-icons/md";

const TaskViewModal = ({ isOpen, onRequestClose, task, onEdit }) => {
    if (!task) return null;

    const handleEdit = () => {
        onEdit();
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            contentLabel="View Task Modal"
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5"
        >
            <div className="relative">
                <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onRequestClose}>
                    <MdClose className="text-xl text-slate-400" />
                </button>

                <div className="flex flex-col gap-2">
                    <label className="input-label text-xl">Title</label>
                    <div className="flex items-center gap-2 mb-2">
                        <input 
                            type="text" 
                            className="text-2xl text-slate-900 font-medium outline-none w-full" 
                            value={task.title}
                            readOnly
                        />
                        <MdCreate className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-400" onClick={handleEdit}/>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="input-label text-lg">Content</label>
                    <div className="flex items-center gap-2">
                        <textarea
                            type="text"
                            className="text-slate-900 font-normal outline-none w-full"
                            rows={10}
                            value={task.content}
                            readOnly
                        />
                        <MdCreate className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-400 relative bottom-28" onClick={handleEdit} />
                    </div>
                </div>

                <div className="mt-3">
                    <label className="input-label text-lg">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                                {tag}
                            </span>
                        ))}
                        <MdCreate className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-400 relative left-150 bottom-7" onClick={handleEdit} />
                    </div>
                </div>

                <div>
                    <label className="input-label text-lg">Due Date</label>
                    <div>
                    <input 
                            type="text" 
                            className="text-2xl text-slate-900 font-medium outline-none w-full" 
                            value={moment(task.dueDate).format('Do MMM YYYY')}
                            readOnly
                        />
                        <MdCreate className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-400 relative left-150 bottom-8" onClick={handleEdit} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TaskViewModal;