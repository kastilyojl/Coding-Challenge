import React, { useState } from "react";
import axios from "axios"; // handle HTTP requests to the backend API
import { useNavigate } from "react-router-dom"; // programmatic page navigation

const Register = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate(); // programmatic page navigation

    const [password, setPassword] = useState(""); // State to store and manage password state
    const [confirmpassword, setConfirmpassword] = useState(""); // State to store and manage confirm password state
    const [error, setError] = useState(""); // State to store and manage error state
    const [success, setSuccess] = useState(""); // State to store success and manage message
    const [loading, setLoading] = useState(false); // State to manage loading and manage loading state

    const [firstName, setFirstName] = useState(""); // State to store and manage the firstName state
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imagePath, setImagePath] = useState(null);
    const [homeAddress, setHomeAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [about, setAbout] = useState("");

    const [skills, setSkills] = useState([]); // State to hold dynamic skills input
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while waiting for response
        setError(""); // Clear any previous errors
        setSuccess(""); // Clear any previous success messages

        // Check if condition is met, if not update the error state
        if (!firstName) {
            setError("First Name is required.");
            setLoading(false);
            return;
        } else if (!lastName) {
            setError("Last Name is required.");
            setLoading(false);
            return;
        } else if (!imagePath) {
            setError("Image is required.");
            setLoading(false);
            return;
        } else if (!homeAddress) {
            setError("Address is required.");
            setLoading(false);
            return;
        }

        // check if password and confirm password have the same value
        if (password !== confirmpassword) {
            setError("Password do not match.");
            setLoading(false);
            return;
        }

        // Use FormData to send the user data, including the image
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);
        formData.append("homeAddress", homeAddress);
        formData.append("postalCode", postalCode);
        formData.append("about", about);
        formData.append("skills", JSON.stringify(skills)); // convert the array into JSON string
        formData.append("education", JSON.stringify(education)); // convert the array into JSON string
        formData.append("experience", JSON.stringify(experience)); // convert the array into JSON string
        formData.append("imagePath", imagePath);

        try {
            // send POST request to the register API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register", // API endpoint for register
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // multipart/form-data to handle file upload (image)
                    },
                }
            );

            console.log("Response:", response.data); // Log response

            // Handle success response
            setSuccess("Registration successful! Please log in.");
            navigate("/success"); // navigate to the success page after successful register
        } catch (err) {
            setLoading(false); // Set loading to false when the request is done
            if (err.response) {
                console.error("Error response:", err.response); // Log response

                // Check if there are validation errors and log them
                if (err.response.data.errors) {
                    console.error(
                        "Validation errors:",
                        err.response.data.errors
                    );
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
            {/* multipart/form-data to handle file upload */}
            <form encType="multipart/form-data">
                {/* UserProfile component with passed values and setters for state management */}
                <UserProfile
                    firstName={firstName}
                    lastName={lastName}
                    imagePath={imagePath}
                    phoneNumber={phoneNumber}
                    homeAddress={homeAddress}
                    postalCode={postalCode}
                    about={about}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setImagePath={setImagePath}
                    setEmail={setEmail}
                    setPhoneNumber={setPhoneNumber}
                    setHomeAddress={setHomeAddress}
                    setPostalCode={setPostalCode}
                    setAbout={setAbout}
                />{" "}
                <hr className="my-8" />
                <Education setEducation={setEducation} />{" "}
                <hr className="my-8" />
                <Skills setSkills={setSkills} /> <hr className="my-8" />
                <Experience setExperience={setExperience} />{" "}
                <hr className="my-8" />
                <Account
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    confirmpassword={confirmpassword}
                    setConfirmpassword={setConfirmpassword}
                />{" "}
                <hr className="my-8" />
                <div className="flex justify-between">
                    <div className="">
                        {/* display the error message stored */}
                        {error && (
                            <div className="text-[12px] text-red-700">
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
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-6 rounded-sm bg-green-800 text-white"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

// UserProfile Component that sends data to the Parent Component via props
const UserProfile = ({
    firstName,
    lastName,
    imagePath,
    phoneNumber,
    homeAddress,
    postalCode,
    about,
    setFirstName,
    setLastName,
    setImagePath,
    setPhoneNumber,
    setHomeAddress,
    setPostalCode,
    setAbout,
}) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePath(file); // Update the image state with the selected file
        }
    };
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
                        <label className="font-semibold text-[14px]" htmlFor="">
                            First Name
                        </label>
                        <input
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none "
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-[14px]" htmlFor="">
                            Last Name
                        </label>
                        <input
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                    {/* <div>
                        <label className="font-semibold text-[14px]" htmlFor="">
                            Email Address
                        </label>
                        <input
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div> */}
                    <div>
                        <label className="font-semibold text-[14px]" htmlFor="">
                            Photo
                        </label>
                        <input
                            type="file"
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            accept="image/*"
                            id="imagePath"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-[14px]" htmlFor="">
                            Phone Number
                        </label>
                        <input
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-[1fr_25%] lg:gap-10">
                    <div>
                        <label className="font-semibold text-[14px]" htmlFor="">
                            Home Address
                        </label>
                        <input
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                            id="homeAddress"
                            value={homeAddress}
                            onChange={(e) => setHomeAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="font-semibold text-[14px]" htmlFor="">
                            ZIP | Postal Code
                        </label>
                        <input
                            className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                            type="text"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="font-semibold text-[14px]" htmlFor="">
                        About
                    </label>
                    <textarea
                        className="w-full h-40 rounded-sm p-4 border-[1px] text-[14px] border-slate-300 focus:border-green-800 focus:outline-none"
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

// Skills Component
const Skills = ({ setSkills }) => {
    const [inputs, setInputs] = useState([""]);

    // add a new input field
    const addInputField = (e) => {
        e.preventDefault();
        setInputs([...inputs, ""]);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        setSkills(newInputs); // Pass updated skills data to parent (UserProfile)
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
                                className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                type="text"
                                value={input}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,

                                        e.target.value
                                    )
                                }
                                placeholder="Enter Skills"
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="bg-[#166534] rounded-sm py-2 px-4 text-[12px] text-white"
                    onClick={addInputField}
                >
                    Add Skills
                </button>
            </div>
        </div>
    );
};

// Education Component
const Education = ({ setEducation }) => {
    const [inputs, setInputs] = useState([
        { institution: "", course: "", startDate: "", endDate: "" },
    ]);

    // add input field
    const addInputField = () => {
        setInputs([
            ...inputs,
            { institution: "", course: "", startDate: "", endDate: "" },
        ]);
    };

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
        setEducation(newInputs); // Pass updated education data to parent (UserProfile)
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
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    Institution
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                    value={input.institution}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "institution",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    Course
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                    value={input.course}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "course",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 mb-8">
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    Start Date
                                </label>
                                <input
                                    className="w-full h-8 px-5 rounded-sm border-[1px] text-[14px]  border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                    value={input.startDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "startDate",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    End Date
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm px-5 border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                    value={input.endDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "endDate",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    className="bg-[#166534] rounded-sm py-2 px-4 text-[12px] text-white"
                    type="button"
                    onClick={addInputField}
                >
                    Add Education
                </button>
            </div>
        </div>
    );
};

// Experience Component
const Experience = ({ setExperience }) => {
    const [inputs, setInputs] = useState([
        {
            jobTitle: "",
            employer: "",
            startDate: "",
            endDate: "",
            jobDescription: "",
        },
    ]);

    // add inout field
    const addInputField = () => {
        setInputs([
            ...inputs,
            {
                jobTitle: "",
                employer: "",
                startDate: "",
                endDate: "",
                jobDescription: "",
            },
        ]);
    };

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
        setExperience(newInputs); // Pass updated experience data to parent (UserProfile)
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
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 mb-8">
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    Job Title
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                    value={input.jobTitle}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "jobTitle",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    Employer
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="text"
                                    value={input.employer}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "employer",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 mb-8">
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    Start Date
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm px-5 border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                    value={input.startDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "startDate",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    className="font-semibold text-[14px]"
                                    htmlFor=""
                                >
                                    End Date
                                </label>
                                <input
                                    className="w-full h-8 rounded-sm px-5 border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                                    type="month"
                                    value={input.endDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "endDate",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                className="font-semibold text-[14px]"
                                htmlFor=""
                            >
                                Job Description
                            </label>
                            <textarea
                                className="w-full h-40 rounded-sm p-4 border-[1px] text-[14px] border-slate-300 focus:border-green-800 focus:outline-none"
                                value={input.jobDescription}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "jobDescription",
                                        e.target.value
                                    )
                                }
                            ></textarea>
                        </div>
                    </div>
                ))}
                <button
                    className="bg-[#166534] rounded-sm py-2 px-4 text-[12px] text-white"
                    type="button"
                    onClick={addInputField}
                >
                    Add Experience
                </button>
            </div>
        </div>
    );
};

// Account Component that sends data to the Parent Component via props
const Account = ({
    email,
    setEmail,
    password,
    setPassword,
    confirmpassword,
    setConfirmpassword,
}) => {
    return (
        <div className="lg:grid lg:grid-cols-[30%_1fr]">
            <div>
                <h2 className="mb-10 text-[#166534] text-[20px] font-semibold lg:mb-0">
                    Account
                </h2>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-[14px]" htmlFor="email">
                    Username
                </label>
                <input
                    className="lg:w-[50%] h-8 mb-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="font-semibold text-[14px]" htmlFor="password">
                    Password
                </label>
                <input
                    className="lg:w-[50%] h-8 mb-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label className="font-semibold text-[14px]" htmlFor="password">
                    Confirm Password
                </label>
                <input
                    className="lg:w-[50%] h-8 mb-8 rounded-sm border-[1px] text-[14px] border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="password"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    required
                />
                {/* <label className="font-semibold" htmlFor="">
                    Confirm Password
                </label>
                <input
                    className="lg:w-[50%] h-8 mb-8 rounded-sm border-2 border-slate-300 pl-4 focus:border-green-800 focus:outline-none"
                    type="text"
                /> */}
            </div>
        </div>
    );
};

export default Register;
