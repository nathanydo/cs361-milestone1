import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useUserInfo from "../../utils/useUserInfo";
import CalendarView from "../../components/CalendarView/CalendarView";
import SideMenu from '../../components/SideMenu/SideMenu';

const Calendar = () => {
    const userInfo = useUserInfo();
    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className="flex flex-row mt-10 justify-center">
                <div>
                    <SideMenu />
                </div>
                <div className="relative left-20">
                    <CalendarView />
                </div>
            </div>
        </>
    );
};

export default Calendar;