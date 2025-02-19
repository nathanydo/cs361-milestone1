import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo = {}, onLogout }) => {

    if (!userInfo || !userInfo.fullName) {
        return <p></p>;
    }

    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200">
                {getInitials(userInfo.fullName)}
            </div>
                
            <div>
                <p className="text-sm text-gray-500">{userInfo.fullName}</p>
                <button className="text-sm text-slate-700 underline cursor-pointer hover:text-slate-500/25" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;