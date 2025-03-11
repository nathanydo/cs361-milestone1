import axios from 'axios';

export const validateEmail = async (email) => {
    try {
        console.log("Email Verification Request")
        const response = await axios.post('http://localhost:8000/validate-email', { email });
        return response.data.isValid;
    } catch (error) {
        console.error("Error validating email:", error);
        return false;
    }
};