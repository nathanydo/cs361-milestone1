import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import {MdCreate, MdDelete} from "react-icons/md";

const TaskCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-lg font-medium text-black">{title}</h6>
                    <span className="text-gray-500 text-xs">{date}</span>
                    
                </div>

                <MdOutlinePushPin 
                        className={`icon-btn ${isPinned ? "text-yellow-500" : "text-gray-400"}`} 
                        onClick={onPinNote} 
                    />
            </div>

            <p className="text-gray-500 mt-2">{content ? content.slice(0, 60) : "No content available"}</p>

            <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-slate-500">{tags}</div>
                
                <div className="flex items-center gap-2">
                    <MdCreate 
                        className="icon-btn text-gray-500 cursor-pointer" 
                        onClick={onEdit}
                    />
                    <MdDelete 
                        className="icon-btn text-gray-500 cursor-pointer" 
                        onClick={onDelete} 
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
