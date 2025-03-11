import React, { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { ContinuousCalendar } from './ContinuousCalendar';

const CalendarView = () => {
    const [tasks, setTasks] = useState([]);

    const getAllTasks = async () => {
        try {
            const response = await axiosInstance.get("/get-all-tasks");
            if (response.data && response.data.tasks) {
                setTasks(response.data.tasks);
            }
        } catch (error) {
            console.log(error)
            console.log("An unexpected error occurred. Please try again");
        }
    };

    useEffect(() => {
            getAllTasks();
    }, []);

    console.log(tasks)
    return <ContinuousCalendar tasks={tasks} />;
};

export default CalendarView;