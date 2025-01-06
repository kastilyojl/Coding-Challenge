import React, { useState } from "react"; // hook
import axios from "axios"; // handle HTTP requests to the backend API
import { useNavigate } from "react-router-dom"; // programmatic page navigation
import unlock from "../../assets/undraw_unlock_q1e5 (1).png"; // image from assessts folder
import { Link } from "react-router-dom"; // directive page navigation

const Login = () => {
    const [email, setEmail] = useState(""); // useState hook to store and manage the email state
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // "useState hook to store the error message"
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false); // show loading message/action when API is in progress
    const navigate = useNavigate(); // programmatic page navigation

    // handle form submission when the user hit the register button
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (page reload)
        setLoading(true); // Set loading to true while waiting for response
        setError(""); // Clear any previous errors
        setSuccess(""); // Clear any previous success messages

        try {
            // send POST request to the login API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login", // API endpoint for logging in
                {
                    email,
                    password,
                }
            );

            // check if the response contains token and user data
            if (response.data.token && response.data.user) {
                setSuccess("Login successful!");
                localStorage.setItem("token", response.data.token); // Store JWT token in localStorage
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user) // Store user data in localStorage
                );
                navigate("/home"); // navigate to the home page after successful login
            } else {
                setError("Invalid login response. Please try again."); // update the error state with the error message
            }
            // handle error
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setError(
                    // update the error state with the error message
                    err.response.data.error || "Login failed. Please try again."
                );
            } else {
                // update the error state with the error message
                setError("Something went wrong. Please try again.");
            }
        }
    };

    // Frontend
    return (
        <div className="h-screen flex items-center justify-center px-5">
            <div className="flex flex-col rounded md:grid grid-cols-[200px_1fr] w-[600px] h-[400px]">
                <div className="hidden p-4 md:block">
                    <div className="h-full ">
                        <img
                            className="object-cover w-full h-full"
                            src={unlock}
                            alt="login image"
                        />
                    </div>
                </div>
                <div className="relative flex flex-col justify-center p-4">
                    <h1 className="mb-5 pt-4 text-[#166534] text-[32px] font-semibold md:absolute md:top-0 md:mb-0">
                        Login
                    </h1>

                    <form
                        className="flex flex-col justify-center gap-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="h-8 focus:outline-none pl-2 text-[14px] border-b-[1px] border-b-green-800"
                            type="email"
                            id="email"
                            value={email}
                            // onChange handler to update email state
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <input
                            className="h-8 pl-2 focus:outline-none text-[14px] border-b-[1px] border-b-green-800"
                            type="password"
                            id="password"
                            // onChange handler to update password state
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <p className="text-[12px]">
                            Don't have an account yet?
                            {/* direct the user to the register page */}
                            <Link className="text-cyan-600 px-2" to="/register">
                                Register
                            </Link>
                        </p>
                        <button
                            className="bg-green-800 p-2 text-white rounded-md w-[140px] mx-auto"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <div className="relative">
                            {/* display the error message stored */}
                            {error && (
                                <div className="text-[12px] text-red-700 absolute">
                                    {error}
                                </div>
                            )}
                            {/* display the succes message stored */}
                            {success && (
                                <div className="text-[12px]  text-green-600">
                                    {success}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
