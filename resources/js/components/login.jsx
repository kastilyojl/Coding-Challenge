import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import unlock from "../../assets/undraw_unlock_q1e5 (1).png";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email,
                    password,
                }
            );

            console.log("Response:", response.data);
            if (response.data.token && response.data.user) {
                setSuccess("Login successful!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                navigate("/home");
            } else {
                setError("Invalid login response. Please try again.");
            }
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setError(
                    err.response.data.error || "Login failed. Please try again."
                );
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

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
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <input
                            className="h-8 pl-2 focus:outline-none text-[14px] border-b-[1px] border-b-green-800"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <p className="text-[12px]">
                            Don't have an account yet?
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
                            {error && (
                                <div className="text-[12px] text-red-700 absolute">
                                    {error}
                                </div>
                            )}
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
