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
                        // Access the profile inside response.data.user.profile
                        setProfile(response.data.user.profile);
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
                <div className="block lg:hidden">
                    <button className="text-2xl" onClick={showLogout}>
                        <img src={menu} alt="menu" style={{ height: "40px" }} />
                    </button>

                    {open && (
                        <div>
                            <button
                                onClick={handleLogout}
                                className="border-2 px-4 py-2 rounded-md hover:bg-slate-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="hidden lg:block">
                    <div className="flex gap-3">
                        <strong className="text-[#166534]">{user?.name}</strong>
                        <span className="border-2 border-slate-500 h-6"></span>
                        <p
                            onClick={handleLogout}
                            className="hover:cursor-pointer"
                        >
                            Logout
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-[30%_70%] lg:mx-20">
                <div className="grid grid-rrows-[60%_40%] gap-5 p-9">
                    <div className="border-2 flex flex-col items-center px-6 py-6 shadow-lg">
                        <div className="w-32 h-32 border-2 rounded-[50%] mb-4"></div>
                        <strong className="text-[20px] text-red-500">
                            {user?.name}
                        </strong>
                        <h1>{user?.email}</h1>
                        <h4>{profile?.phoneNumber}</h4>
                        <h3>
                            {profile?.homeAddress}, {profile?.postalCode}
                        </h3>
                        <div className="w-full h-[0.5px] bg-yellow-300 my-4"></div>
                        <h3 className="text-center"> " {profile?.about} " </h3>
                    </div>
                    <div>
                        <h1 className="text-[24px] mb-2">Skills</h1>
                        <div className="border-2 md:grid md:grid-cols-2 gap-x-2 p-4 shadow-lg">
                            {profile?.skills && profile.skills.length > 0 ? (
                                profile.skills.map((skill, index) => (
                                    <div key={index}>
                                        <p>- {skill}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No skills details available</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-9 pt-0 lg:p-20">
                    <div>
                        <h1 className="text-[24px] mb-2">Education</h1>
                        <LongCard>
                            {profile?.education &&
                            profile.education.length > 0 ? (
                                profile.education.map((edu, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>Institution:</strong>{" "}
                                            {edu.institution}
                                        </p>
                                        <p>
                                            <strong>Course:</strong>{" "}
                                            {edu.course}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong>{" "}
                                            {edu.startDate}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong>{" "}
                                            {edu.endDate}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No education details available</p>
                            )}
                        </LongCard>
                    </div>
                    <div>
                        <h1 className="text-[24px] mb-2">Experience</h1>
                        <LongCard>
                            {profile?.education &&
                            profile.education.length > 0 ? (
                                profile.education.map((exp, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>Institution:</strong>{" "}
                                            {exp.institution}
                                        </p>
                                        <p>
                                            <strong>Course:</strong>{" "}
                                            {exp.course}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong>{" "}
                                            {exp.startDate}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong>{" "}
                                            {exp.endDate}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No Experience details available</p>
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
        <div className="border-2 w-full p-4 mb-10 rounded-md shadow-lg">
            {children}
        </div>
    );
}

export default Home;

{
    /* <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h1>User Information</h1>
                    <p>Email: {user?.email}</p>
                    <h3>Profile</h3>
                    <p>First Name: {profile?.firstName}</p>
                    <p>Last Name: {profile?.lastName}</p>
                    <p>Email: {profile?.email}</p>
                    <p>Phone Number: {profile?.phoneNumber}</p>
                    <p>About: {profile?.about}</p>
                </>
            )}
        </div> */
}
