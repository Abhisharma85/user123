// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import './UserForm.css'; // Import the CSS file

const UserForm = ({ onSubmit, onClose, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        company: '',
        website: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
                street: initialData.address.street,
                city: initialData.address.city,
                company: initialData.company.name,
                website: initialData.website
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, id: initialData?.id });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="street" 
                    placeholder="Street" 
                    value={formData.street} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    value={formData.city} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="company" 
                    placeholder="Company (Optional)" 
                    value={formData.company} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="website" 
                    placeholder="Website (Optional)" 
                    value={formData.website} 
                    onChange={handleChange} 
                />
                <button type="submit">{initialData ? 'Update User' : 'Add User'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default UserForm;
