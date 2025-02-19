import React, { useState} from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import Searchbar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/bamboo_logo.webp";

const Navbar = ({ userInfo, onSearchTask, handleClearSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        localStorage.clear()
        navigate("/login");
    };

    const handleSearch = () => {
        if(searchQuery){
            onSearchTask(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    return (
        <div className="bg-white flex items-center justify-between p-4 shadow-md">
            <div className="flex items-center">
                <h2 className="text-2xl font-extrabold py-2 px-2 bg-gradient-to-r from-lime-400/75 to-lime-600 bg-clip-text text-transparent">ZenTask</h2>
                <img src={logo} alt="ZenTask_logo" className="h-8 w-8 rounded-t-xl rounded-br-xl bg-amber-300/50"/>
            </div>
            {location.pathname !== "/login" && location.pathname !== "/signup" && (
            <Searchbar 
                value={searchQuery}
                onChange={({ target }) => {
                    setSearchQuery(target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
        )}
        
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    );
}

export default Navbar;