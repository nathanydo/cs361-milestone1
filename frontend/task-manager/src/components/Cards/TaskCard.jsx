import moment from "moment"
import React from "react";
import { useLocation } from "react-router-dom";
import { MdOutlinePushPin, MdCreate, MdDelete, MdCheck } from "react-icons/md";

const TaskCard = ({ title, date, dueDate, content, tags, isPinned, onEdit, onDelete, onPinNote, onView}) => {

    const location = useLocation();

    return (
        <div className="border-2 border-dashed border-lime-500 rounded-lg p-4 bg-white hover:shadow-xl hover:shadow-lime-300/50 transition-all ease-in-out" onClick={onView}>
                <div className="flex items-center justify-between">
                    <div>
                        <h6 className="text-lg font-medium text-black">{title}</h6>
                        <span className="text-gray-500 text-xs">{moment(date).format('Do MMM YYYY')}</span>
                        
                    </div>

                    <MdOutlinePushPin 
                            className={`icon-btn ${isPinned ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-700 cursor-pointer text-2xl`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                onPinNote();
                            }} 
                        />
                </div>

                <p className="text-gray-500 mt-2">{content ? content.slice(0, 60) : "No content available"}</p>

                

                <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-slate-500">{tags.map((item) => `#${item} `)}</div>
                <span>Due: {moment.utc(dueDate).format('Do MMM YYYY')}</span>
                <div className="flex items-center gap-2">
                    <MdCreate 
                        className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-400" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    />
                    {location.pathname !== "/dashboard" ? <MdDelete 
                        className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-red-700" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    /> :
                    <MdCheck className="icon-btn w-6 h-6 text-gray-500 cursor-pointer hover:text-green-700" 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
