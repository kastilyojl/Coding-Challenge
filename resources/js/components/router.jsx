import React from "react";

import { Routes, Route } from "react-router-dom";
// import Home from "./home";
import Login from "./login";
import Register from "./register";
// import Home from "./home";

function router() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default router;
