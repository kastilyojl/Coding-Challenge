import React from "react";
import welldone from "../../assets/undraw_well-done_kqud.svg"; // image from assessts folder
import { Link } from "react-router-dom"; // directive page navigation

// Success Page Component - Displays a success message after successful registration
function Success() {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-2">
            <div>
                <img src={welldone} alt="success" style={{ height: "200px" }} />
            </div>
            <h1 className="text-[20px] font-bold text-center my-4 text-green-800">
                Thank you for registering!
            </h1>
            <p className="text-[14px] text-center">
                Your submission has been received
            </p>
            <p className="text-[14px] text-center">
                You can now log in using your credentials
            </p>
            <Link // direct the user to the login page
                className="mt-20 underline text-[14px] text-cyan-600"
                to={"/login"}
            >
                Home
            </Link>
        </div>
    );
}

export default Success;
