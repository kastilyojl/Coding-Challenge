import React from "react";
import welldone from "../../assets/undraw_well-done_kqud.svg";
import { Link } from "react-router-dom";

function Success() {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-2">
            <div>
                <img src={welldone} alt="success" style={{ height: "200px" }} />
            </div>
            <h1 className="text-[24px] font-bold text-center my-4 text-green-800">
                Thank you for registering!
            </h1>
            <p className="text-[18px] font-semibold text-center">
                Your submission has been received
            </p>
            <p className="text-[18px] font-semibold text-center">
                You can now login using your credentials
            </p>
            <Link className="mt-20 underline text-cyan-600" to={"/login"}>
                Home
            </Link>
        </div>
    );
}

export default Success;
