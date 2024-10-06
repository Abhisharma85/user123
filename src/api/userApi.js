// src/api/userApi.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => {
    return axios.get(API_URL);
};

export const addUser = (user) => {
    return axios.post(API_URL, {
        name: user.name,
        email: user.email,
        username: `USER-${user.name.split(' ').join('-')}`,
        phone: user.phone,
        address: {
            street: user.street,
            city: user.city,
        },
        company: {
            name: user.company || '', // Make company optional
        },
        website: user.website || '', // Make website optional
    });
};

// Update User
export const updateUser = (user) => {
    return axios.put(`${API_URL}/${user.id}`, {
        name: user.name,
        email: user.email,
        username: user.username, // Keep the username the same
        phone: user.phone,
        address: {
            street: user.street,
            city: user.city,
        },
        company: {
            name: user.company || '', // Make company optional
        },
        website: user.website || '', // Make website optional
    });
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/${userId}`);
};
