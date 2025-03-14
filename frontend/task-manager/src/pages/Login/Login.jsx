import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import PageDescription from "../../components/PageDescription/PageDescription";
import { validateEmail } from "../../utils/validateEmail";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const isValidEmail = await validateEmail(email);
        if (!isValidEmail) {
            setError("Please enter a valid email address.");
            return;
        }
        if(!password) {
            setError("Please enter a password.");
            return;
        }

        setError("");

        //Login API call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            })

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }

        } catch (error) {
            //Handle Login error
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occured. Please try again.");
            }
        }
    }

    return (<>
        <Navbar />
        <div className="flex items-center justify-center mt-20">
            <div className="w-96 p-6 border border-emerald-700 rounded bg-white shadow-lg rounded-lg">
                <form onSubmit={handleLogin}>
                    <h4 className="text-2xl mb-7">Login</h4>
                    
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="input-box" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>

                    <PasswordInput 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button type="submit" className="btn-primary">
                    Login
                    </button>

                    <p className="text-sm text-center mt-4">
                        Not registered yet?{" "}
                        <Link to="/signup" className="font-medium text-blue-500 underline">
                        Create an Account 
                        </Link>
                    </p>
                </form>
            </div>
        </div>
        <PageDescription />
    </>);
}

export default Login;