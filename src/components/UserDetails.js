// src/components/UserDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = ({ users }) => {
    const { id } = useParams();
    const user = users.find(user => user.id === parseInt(id));

    if (!user) return <p>User not found</p>;

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <Link to="/">Back to Users List</Link>
        </div>
    );
};

export default UserDetails;
