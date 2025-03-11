import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import axiosInstance from "../../utils/axiosInstance";
import PageDescription from "../../components/PageDescription/PageDescription";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const isValidEmail = await validateEmail(email);

        if (!name) {
            setError("Please enter your name.");
            return;
        }
        console.log(isValidEmail)
        if (!isValidEmail) {
            setError("Please enter your email.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError("");

        //API call
        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            // Handle successful registration resposne
            if(response.data && response.data.error){
                setError(response.data.message)
                return
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard")
            }

        } catch (error) {
            //Handle Login error
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occured. Please try again.");
            }
        }
    };
    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center mt-20">
            <div className="w-96 p-6 border rounded-lg bg-white shadow-lg">
                <form onSubmit={handleSignUp}>
                    <h4 className="text-2xl mb-7">SignUp</h4>
                    
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="input-box" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="input-box" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}      
                    />

                    <PasswordInput 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button type="submit" className="btn-primary">
                        Create Account
                    </button>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-blue-500 underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
        <PageDescription />
    </>);
}

export default SignUp;
