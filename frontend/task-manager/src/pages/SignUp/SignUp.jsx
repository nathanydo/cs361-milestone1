import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter your name.");
            return;
        }
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        if (!password) {
            setError("Please enter a password.");
            return;
        }

        setError("");

        //API call
    }
    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center mt-20">
            <div className="w-96 p-6 border rounded bg-white shadow-lg rounded-lg">
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
    </>);
}

export default SignUp;
