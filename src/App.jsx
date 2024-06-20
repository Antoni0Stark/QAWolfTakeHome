import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Start from './components/Start'
import Explanation from './components/Explanation'
import Contact from './components/Contact'

import './css/style.css';

function App() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/start" element={<Start />} />
                <Route path="/explanation" element={<Explanation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} /> {/* Fallback route */}
            </Routes>
        </Router>
    );
}

function NotFound() {
    return <Navigate to="/" />;
}

export default App;