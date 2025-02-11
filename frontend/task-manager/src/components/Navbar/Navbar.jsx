import React, { useState} from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import Searchbar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate;

    const onLogout = () => {
        navigate("/login");
    };

    const handleSearch = () => {};

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="bg-white flex items-center justify-between p-4 shadow-md">
            <h2 className="text-xl font medium text-black py-2">Task Manager</h2>

            <Searchbar 
                value={searchQuery}
                onChange={({ target }) => {
                    setSearchQuery(target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
        
            <ProfileInfo onLogout={onLogout} />
        </div>
    );
}

export default Navbar;