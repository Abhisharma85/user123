// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserDetails from './components/UserDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserTable />} />
                <Route path="/user/:id" element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
