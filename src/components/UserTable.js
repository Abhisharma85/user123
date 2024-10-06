// src/components/UserTable.js
import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import ConfirmationModal from './confirmationModal'; // Import the modal component
import { fetchUsers, addUser, updateUser, deleteUser } from '../api/userApi';
import './UserTable.css'; // Import the CSS file

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
    const [userToDelete, setUserToDelete] = useState(null); // Track user for deletion

    // Fetch users from API
    const loadUsers = async () => {
        const response = await fetchUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Add User
    const handleAddUser = async (newUser) => {
        try {
            const response = await addUser(newUser);
            setUsers([...users, response.data]); // Update state with the new user
            setShowForm(false);
            setSuccessMessage('User added successfully!'); // Set success message
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Update User
    const handleUpdateUser = async (updatedUser) => {
        try {
            const response = await updateUser(updatedUser);
            setUsers(users.map(user => (user.id === response.data.id ? response.data : user))); // Update the user in the state
            setShowForm(false);
            setEditingUser(null); // Reset editing user state
            setSuccessMessage('User updated successfully!'); // Set success message
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Show delete confirmation modal
    const handleShowDeleteModal = (userId) => {
        setUserToDelete(userId); // Set the user to be deleted
        setShowDeleteModal(true); // Show the confirmation modal
    };

    // Delete User after confirmation
    const handleDeleteUser = async () => {
        try {
            await deleteUser(userToDelete); // Call delete API
            setUsers(users.filter(user => user.id !== userToDelete)); // Remove the user from the state
            setSuccessMessage('User deleted successfully!'); // Show success message
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setShowDeleteModal(false); // Close modal
        setUserToDelete(null); // Clear selected user for deletion
    };

    return (
        <div className="table-container">
            <h1 className="user-management-title">User Management System</h1>
            <button className="add-button" onClick={() => setShowForm(true)}>Add User</button>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className="edit-button" onClick={() => { setEditingUser(user); setShowForm(true); }}>Edit</button>
                                    <button className="delete-button" onClick={() => handleShowDeleteModal(user.id)}>Delete</button> {/* Show delete modal */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {showForm && (
                <UserForm 
                    onSubmit={editingUser ? handleUpdateUser : handleAddUser} 
                    onClose={() => setShowForm(false)} 
                    initialData={editingUser} 
                />
            )}
            {/* Confirmation Modal */}
            <ConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)} // Close modal on cancel
                onConfirm={handleDeleteUser} // Delete user on confirm
                message="Are you sure you want to delete this user?" 
            />
        </div>
    );
};

export default UserTable;
