import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<MemberDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/membership" element={<Register />} />
                {/* Fallback route */}
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
