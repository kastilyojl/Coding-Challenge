import React from "react";

import { Routes, Route } from "react-router-dom"; // Importing React Router components
import Login from "./login"; // Login component
import Register from "./register"; // Register component
import Home from "./home"; // Home component
import Success from "../pages/Success"; // Success component

function router() {
    return (
        // Navigate between different pages
        <Routes>
            {/* default route */}
            <Route path="/" element={<Login />} />
            {/* loginpage route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/success" element={<Success />} />
        </Routes>
    );
}

export default router;
