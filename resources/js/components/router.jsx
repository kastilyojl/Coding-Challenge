import React from "react";

import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Success from "../pages/Success";

function router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/success" element={<Success />} />
        </Routes>
    );
}

export default router;
