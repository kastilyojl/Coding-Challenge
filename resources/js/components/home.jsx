import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import menu from "../../assets/bx-menu.svg";

function Home() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (userData && token) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);

                axios
                    .get("http://127.0.0.1:8000/api/home", {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        console.log("Dashboard data:", response.data);

                        const fetchedData = response.data.user.profile;

                        // Parse skills and experience if they are stored as JSON strings
                        if (typeof fetchedData.skills === "string") {
                            fetchedData.skills = JSON.parse(fetchedData.skills);
                        }

                        if (typeof fetchedData.education === "string") {
                            fetchedData.education = JSON.parse(
                                fetchedData.education
                            );
                        }

                        if (typeof fetchedData.experience === "string") {
                            fetchedData.experience = JSON.parse(
                                fetchedData.experience
                            );
                        }

                        // Set the parsed profile data directly
                        setProfile(fetchedData);
                    })
                    .catch((error) => {
                        setError("Failed to fetch dashboard data.");
                        console.error(error);
                    });
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    console.log("Profile state:", profile); // Log the profile state

    const [open, isOpen] = useState(false);
    function showLogout() {
        isOpen(!open);
    }

    // Logout function
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Clear local storage
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Redirect to login
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            setError("Failed to log out.");
        }
    };

    // Render user data and profile
    return (
        <div className="grid flex:grid-rows-[60px_1fr]">
            <div className="flex items-center justify-end border-2 border-b-slate-300 shadow-sm p-4 lg:px-20">
                {/* Menu & Logout Button */}
                <div className="block lg:hidden">
                    <button className="text-2xl" onClick={showLogout}>
                        <img src={menu} alt="menu" style={{ height: "40px" }} />
                    </button>

                    {open && (
                        <div>
                            <button
                                onClick={handleLogout}
                                className="border-2 px-4 py-2 text-[14px] rounded-md hover:bg-slate-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="hidden lg:block">
                    <div className="flex gap-3 items-center">
                        <strong className="text-[#166534] text-[14px]">
                            {user?.name}
                        </strong>
                        <span className="border-[1px] border-slate-500 h-4"></span>
                        <p
                            onClick={handleLogout}
                            className="hover:cursor-pointer hover:text-slate-500 text-[14px]"
                        >
                            Logout
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-[30%_70%] lg:mx-20">
                <div className="grid grid-rrows-[60%_40%] gap-5 p-9">
                    <div className="border-2 flex flex-col items-center px-6 py-6 shadow-lg">
                        <div className="w-32 h-32 border-2 rounded-[50%] mb-4">
                            <img
                                src={`http://127.0.0.1:8000/storage/${profile?.user_pic}`}
                                alt="Profile"
                                style={{
                                    objectFit: "cover",
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                        </div>
                        <strong className="text-[16px] text-red-500">
                            {user?.name}
                        </strong>
                        <h1 className="text-[14px]">{user?.email}</h1>
                        <h4 className="text-[14px]"> {profile?.phoneNumber}</h4>
                        <h3 className="text-[14px]">
                            {profile?.homeAddress}, {profile?.postalCode}
                        </h3>
                        <div className="w-full h-[0.5px] bg-green-800 my-4"></div>
                        <h3 className="text-center"> {profile?.about} </h3>
                    </div>
                    <div>
                        <h1 className="text-[18px] mb-2 text-green-800 font-semibold">
                            Skills
                        </h1>

                        {/* Check if skills are correctly parsed */}
                        <div className="border-2 md:grid md:grid-cols-2 gap-x-2 p-4 shadow-lg">
                            {profile?.skills &&
                            typeof profile.skills === "object" ? (
                                Object.values(profile.skills).map(
                                    (skill, index) => (
                                        <div key={index}>
                                            <p className="text-[14px]">
                                                - {skill}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <p className="text-[14px]">
                                    No skills details available
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-9 pt-0 lg:p-20">
                    <div>
                        <h1 className="text-[18px] mb-2 text-green-800 font-semibold">
                            Education
                        </h1>

                        {/* Stored as a JSON object in the database */}

                        <LongCard>
                            {profile?.education &&
                            typeof profile.skills === "object" ? (
                                Object.values(profile.education).map(
                                    (edu, index) => (
                                        <div key={index}>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>Institution:</strong>{" "}
                                                {edu.institution}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>Course:</strong>{" "}
                                                {edu.course}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>Start Date:</strong>{" "}
                                                {edu.startDate}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>End Date:</strong>{" "}
                                                {edu.endDate}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <p className="text-[14px]">
                                    No skills details available
                                </p>
                            )}
                        </LongCard>
                    </div>
                    <div>
                        <h1 className="text-[18px] mb-2 text-green-800 font-semibold">
                            Experience
                        </h1>

                        {/* Stored as a JSON object in the database */}

                        <LongCard>
                            {profile?.experience &&
                            typeof profile.experience === "object" ? (
                                Object.values(profile.experience).map(
                                    (exp, index) => (
                                        <div key={index}>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>Job Title:</strong>{" "}
                                                {exp.jobTitle}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>Employer:</strong>{" "}
                                                {exp.employer}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>Start Date:</strong>{" "}
                                                {exp.startDate}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <strong>End Date:</strong>{" "}
                                                {exp.description}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <p className="text-[14px]">
                                    No Experience details available
                                </p>
                            )}
                        </LongCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LongCard({ children }) {
    return (
        <div className="border-2 w-full p-4 mb-10 rounded-sm shadow-lg">
            {children}
        </div>
    );
}

export default Home;
