import React, {useState, useEffect} from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose} from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditTasks = ({taskData, type, getAllTasks, onClose, showToastMessage}) => {  
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

      // ✅ Update state when taskData changes
      useEffect(() => {

        if (taskData) {
            setTitle(taskData.title || "");
            setContent(taskData.content || "");
            setTags(taskData.tags || []);
        }
    }, [taskData]);

    // Add Note
    const addNewTasks = async () => {
        try {
            const response = await axiosInstance.post("/add-task", {
                title,
                content,
                tags,
            });

            if(response.data && response.data.tasks) {
                getAllTasks();
                onClose()
            }
        } catch (error) {
            if(
                error.repsonse &&
                error.response.data &&
                error.reponse.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };
    
    const editTask = async () => {
        const taskId = taskData._id;
        
        try {
            const response = await axiosInstance.put("/edit-task/" + taskId, {
                title,
                content,
                tags,
            });

            if(response.data && response.data.tasks){
                getAllTasks();
                onClose();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message);
            }
        }
    };
    const handleAddTask = async () => {
        if(!title) {
            setError("Please enter the title");
            return;
        }

        if(!content){
            setError("Please enter content");
        }

        setError("");

        if(type === 'edit'){
            await editTask()
            showToastMessage("Task updated successfully");
            getAllTasks();
            onClose();
        } else {
            await addNewTasks()
            showToastMessage("Task added successfully");
            getAllTasks();
            onClose();
        }
    };
    return (

        <div className="relative">
            <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">Title</label>
                <input 
                    type="text" 
                    className="text-2xl text-slate-900 font-medium outline-none w-full" 
                    placeholder="Title"
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <label className="input-label">Content</label>
                <textarea
                    type="text"
                    className="text-slate-900 font-normal outline-none w-full"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">Tags</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" 
            onClick={handleAddTask}
            >
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
};

export default AddEditTasks;

