import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags}) => {

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if(inputValue.trim() !== "") {
            setTags([...tags, inputValue]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>

            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-3">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-200 px-3 py-1 rounded">
                     # {tag}
                    <button onClick={() => {
                        handleRemoveTag(tag)
                        }}>
                        <MdClose className="cursor-pointer"/>
                        </button>
                    </span>
                ))}
            </div>
        )}
            <div className="flex items-center gap-2 mt-3">
                <input 
                    type="text"
                    value={inputValue}
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none" 
                    placeholder ="Add tags" 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    />

                <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-400"
                onClick={() => {
                    addNewTag();
                }}
                >

                    <MdAdd className="text-2xl text-blue-500 hover:text-slate-200" />
                </button>
            </div>
        </div>
    )
}

export default TagInput;