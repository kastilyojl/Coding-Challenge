import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error message
    const [success, setSuccess] = useState(""); // State to store success message
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while waiting for response
        setError(""); // Clear any previous errors
        setSuccess(""); // Clear any previous success messages

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name,
                    email,
                    password,
                }
            );

            console.log("Response:", response.data); // Log the response to check success

            // Handle success response: display the success message and handle further actions
            setSuccess("Registration successful! Please log in.");
        } catch (err) {
            setLoading(false); // Set loading to false when the request is done
            if (err.response) {
                console.error("Error response:", err.response); // Log the full response

                // Check if there are validation errors
                if (err.response.data.errors) {
                    setError(
                        err.response.data.errors.email ||
                            "Registration failed. Please try again."
                    );
                } else {
                    setError(
                        err.response.data.message || "Registration failed"
                    );
                }
            } else {
                setError("Something went wrong.");
            }
        }
    };

    return (
        <div className="w-full h-fu mt-2ll px-10 py-10 md:px-20 md:py-20 lg:px-40">
            <form>
                <UserProfile /> <hr className="my-8" />
                <Education /> <hr className="my-8" />
                <Skills /> <hr className="my-8" />
                <Experience /> <hr className="my-8" />
                <Account /> <hr className="my-8" />
                <div className="flex justify-end">
                    <button className="py-2 px-6 rounded-md bg-green-800 text-white">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

const UserProfile = () => {
    return (
        <div className="lg:grid lg:grid-cols-[30%_1fr]">
            <div>
                <h2 className="mb-10 text-[#166534] text-[20px] font-semibold lg:mb-0">
                    Profile
                </h2>
            </div>
            <div className="grid gap-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                    <div>
                        <label className="font-semibold" htmlFor="">
                            First Name
                        </label>
                        <input
                            className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none "
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="">
                            Last Name
                        </label>
                        <input
                            className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                        />
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                    <div>
                        <label className="font-semibold" htmlFor="">
                            Email Address
                        </label>
                        <input
                            className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="">
                            Phone Number
                        </label>
                        <input
                            className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                        />
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-[1fr_25%] lg:gap-10">
                    <div>
                        <label className="font-semibold" htmlFor="">
                            Home Address
                        </label>
                        <input
                            className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="">
                            ZIP | Postal Code
                        </label>
                        <input
                            className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                        />
                    </div>
                </div>
                <div>
                    <label className="font-semibold" htmlFor="">
                        About
                    </label>
                    <textarea
                        className="w-full h-40 mt-2 rounded-md pl-4 py-4 border-2 border-slate-300 focus:border-green-800 focus:outline-none"
                        name=""
                        id=""
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

const Skills = () => {
    const [inputs, setInputs] = useState([""]);

    const addInputField = () => {
        setInputs([...inputs, ""]);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    return (
        <div className="lg:grid lg:grid-cols-[30%_1fr]">
            <div>
                <h2 className="mb-10 text-[#166534] text-[20px] font-semibold lg:mb-0">
                    Skills
                </h2>
            </div>
            <div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                    {inputs.map((input, index) => (
                        <div key={index} className="mb-8">
                            <input
                                className="w-full h-10 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                type="text"
                                value={input}
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value)
                                }
                                placeholder="Enter Skills"
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="bg-[#166534] rounded-sm py-2 px-6 text-white"
                    onClick={addInputField}
                    ld
                >
                    Add Skills
                </button>
            </div>
        </div>
    );
};

const Education = () => {
    const [inputs, setInputs] = useState([""]);

    const addInputField = () => {
        setInputs([...inputs, ""]);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };
    return (
        <div className="lg:grid lg:grid-cols-[30%_1fr]">
            <div>
                <h2 className="mb-10 text-[#166534] text-[20px] font-semibold lg:mb-0">
                    Education
                </h2>
            </div>
            <div>
                {inputs.map((input, index) => (
                    <div key={index} className="mb-8">
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 mb-8">
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    Institution
                                </label>
                                <input
                                    className="w-full h-10  mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    Course
                                </label>
                                <input
                                    className="w-full h-10  mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 mb-8">
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    Start Date
                                </label>
                                <input
                                    className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    End Date
                                </label>
                                <input
                                    className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    className="bg-[#166534] rounded-sm py-2 px-6 text-white"
                    onClick={addInputField}
                    ld
                >
                    Add Education
                </button>
            </div>
        </div>
    );
};

const Experience = () => {
    const [inputs, setInputs] = useState([""]);

    const addInputField = () => {
        setInputs([...inputs, ""]);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };
    return (
        <div className="lg:grid lg:grid-cols-[30%_1fr]">
            <div>
                <h2 className="mb-10 text-[#166534] text-[20px] font-semibold lg:mb-0">
                    Experience
                </h2>
            </div>
            <div>
                {inputs.map((input, index) => (
                    <div key={index} className="mb-8">
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] llg:gap-10 mb-8">
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    Job Title
                                </label>
                                <input
                                    className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    Employer
                                </label>
                                <input
                                    className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 mb-8">
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    Start Date
                                </label>
                                <input
                                    className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="">
                                    End Date
                                </label>
                                <input
                                    className="w-full h-10 mt-2 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold" htmlFor="">
                                Job Description
                            </label>
                            <textarea
                                className="w-full h-40 mt-2 rounded-md pl-4 py-4 border-2 border-slate-300 focus:border-green-800 focus:outline-none"
                                mtmt-2
                                name=""
                                id=""
                            ></textarea>
                        </div>
                    </div>
                ))}
                <button
                    className="bg-[#166534] rounded-sm py-2 px-6 text-white"
                    onClick={addInputField}
                    ld
                >
                    Add Experience
                </button>
            </div>
        </div>
    );
};

const Account = () => {
    return (
        <div className="lg:grid lg:grid-cols-[30%_1fr]">
            <div>
                <h2 className="mb-10 text-[#166534] text-[20px] font-semibold lg:mb-0">
                    Account
                </h2>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold" htmlFor="email">
                    Username
                </label>
                <input
                    className="lg:w-[50%] h-10 mt-2 mb-8 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="font-semibold" htmlFor="password">
                    Password
                </label>
                <input
                    className="lg:w-[50%] h-10 mt-2 mb-8 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label className="font-semibold" htmlFor="">
                    Confirm Password
                </label>
                <input
                    className="lg:w-[50%] h-10 mt-2 mb-8 rounded-md border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="text"
                />
            </div>
        </div>
    );
};

export default Register;
