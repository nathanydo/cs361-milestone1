import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return userInfo;
};

export default useUserInfo;