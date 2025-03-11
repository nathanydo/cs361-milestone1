import axios from 'axios';

const port = 8001;


export const showToast = async (message, type) => {
    try {
        console.log("Notifaction Request Sent")
        await axios.post(`http://localhost:${port}/show-toast`, { message, type});
    } catch (error) {
        console.error("Error showing toast:", error);
    }
};

export const subscribeToToasts = (onMessage) => {
    const eventSource = new EventSource(`http://localhost:${port}/events`);
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    return () => {
        eventSource.close();
    };
};
