import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    // Render user data and profile
    return (
        <div>
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
        </div>
    );
}

export default Home;
