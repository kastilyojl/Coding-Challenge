import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // programmatic page navigation
import axios from "axios"; // handle HTTP requests to the backend API
import menu from "../../assets/bx-menu.svg"; // image from assessts folder

function Home() {
    const [user, setUser] = useState(null); // useState hook to store and manage the user state
    const [profile, setProfile] = useState(null); // useState hook to store and manage the profile state
    const [error, setError] = useState(null); // "useState hook to store the error message"
    const [loading, setLoading] = useState(true); // show loading message/action when API is in progress
    const navigate = useNavigate(); // programmatic page navigation

    useEffect(() => {
        const userData = localStorage.getItem("user"); // Get stored user data
        const token = localStorage.getItem("token"); // Get the stored JWT token

        // check if both userData && token is exist
        if (userData && token) {
            try {
                // convert the userData from JSON string to JavaScript object
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser); // set the parsed user data to state

                axios
                    // send request in API url
                    .get("http://127.0.0.1:8000/api/home", {
                        headers: { Authorization: `Bearer ${token}` }, // sending Bearer token
                    })
                    .then((response) => {
                        console.log("Home data:", response.data); // Log response data

                        // retrieve user profile data in from the response
                        const fetchedData = response.data.user.profile;

                        if (typeof fetchedData.skills === "string") {
                            fetchedData.skills = JSON.parse(fetchedData.skills);
                        } // check if skills is a JSON string, then parse it into a JavaScript object or array

                        if (typeof fetchedData.education === "string") {
                            fetchedData.education = JSON.parse(
                                fetchedData.education
                            );
                        } // check if education is a JSON string, then parse it into a JavaScript object or array

                        if (typeof fetchedData.experience === "string") {
                            fetchedData.experience = JSON.parse(
                                fetchedData.experience
                            );
                        } // check if experience is a JSON string, then parse it into a JavaScript object or array

                        // set the parsed profile data to state
                        setProfile(fetchedData);
                    })
                    .catch((error) => {
                        setError("Failed to fetch dashboard data."); // update the error state with the error message
                        console.error(error); // log error
                    });
            } catch (error) {
                // handle error
                console.error("Failed to parse user data:", error); // log error
                localStorage.removeItem("user"); // clear the user data from local storage
                localStorage.removeItem("token"); // clear the token from local storage
                navigate("/login"); // redirect to loginpage
            } finally {
                setLoading(false);
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    console.log("Profile state:", profile); // Log profile state

    const [open, isOpen] = useState(false);
    function showLogout() {
        // Toggle the visibility of the logout button on small-medium screens
        isOpen(!open);
    }

    // Logout function to handle user logout
    const handleLogout = async () => {
        try {
            // retrieve the token from localStorage
            const token = localStorage.getItem("token");

            // Send a POST request to the logout API endpoint with the token for authentication
            await axios.post(
                "http://127.0.0.1:8000/api/logout", // API endpoint for logging out
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // attach the token in the Authorization header
                    },
                }
            );

            // Clear local storage
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Redirect to login
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error); // log error
            setError("Failed to log out."); // update the error state with the error message
        }
    };

    // Frontend
    return (
        <div>
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
                <div className="gap-5 p-9">
                    <div className="border-2 flex flex-col items-center px-6 py-6 shadow-lg mb-5">
                        <div className="w-32 h-32 border-2 rounded-[50%] mb-4 overflow-hidden">
                            <img
                                src={`http://127.0.0.1:8000/storage/${profile?.user_pic}`} // image source URL
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
                        <h3 className="text-center text-[10px] break-words w-full">
                            {profile?.about}
                        </h3>
                    </div>
                    <div>
                        <h1 className="text-[18px] mb-2 text-green-800 font-semibold">
                            Skills
                        </h1>

                        <div className="border-2 md:grid md:grid-cols-2 gap-x-2 p-4 shadow-lg">
                            {/* check if profile.skills exists and if it's an array */}
                            {profile?.skills &&
                            Array.isArray(profile.skills) ? (
                                // map through the skills array and display the data
                                profile.skills.map((skill, index) => (
                                    <div key={index}>
                                        <p className="text-[14px]">- {skill}</p>
                                    </div>
                                ))
                            ) : (
                                // show a message if the condition is not met
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

                        {/* LongCard component for reusability  */}
                        <LongCard>
                            {/* check if profile.education exists and if it's an object */}
                            {profile?.education &&
                            typeof profile.education === "object" ? (
                                // map through the education array and display the data
                                Object.values(profile.education).map(
                                    (edu, index) => (
                                        <div key={index} className="mb-5">
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    Institution:
                                                </p>{" "}
                                                {edu.institution}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    Course:
                                                </p>{" "}
                                                {edu.course}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    Start Date:
                                                </p>{" "}
                                                {edu.startDate}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    End Date:
                                                </p>{" "}
                                                {edu.endDate}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                // show a message if the condition is not met
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

                        {/* LongCard component for reusability  */}
                        <LongCard>
                            {/* check if profile.experience exists and if it's an object */}
                            {profile?.experience &&
                            typeof profile.experience === "object" ? (
                                // map through the experience array and display the data
                                Object.values(profile.experience).map(
                                    (exp, index) => (
                                        <div key={index} className="mb-5">
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    Job Title:
                                                </p>{" "}
                                                {exp.jobTitle}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    Employer:
                                                </p>{" "}
                                                {exp.employer}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    Start Date:
                                                </p>{" "}
                                                {exp.startDate}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]">
                                                    End Date:
                                                </p>{" "}
                                                {exp.endDate}
                                            </p>
                                            <p className="text-[14px] grid grid-cols-[100px_1fr]">
                                                <p className="font-semibold text-[14px]  break-words w-full">
                                                    Description:
                                                </p>{" "}
                                                {exp.jobDescription}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                // show a message if the condition is not met
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

// LongCard component that accepts children as props and renders them inside
function LongCard({ children }) {
    return (
        <div className="border-2 w-full p-4 mb-10 rounded-sm shadow-lg">
            {children}
        </div>
    );
}

export default Home;
