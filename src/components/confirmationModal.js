// src/components/ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css'; // Optional CSS for the modal

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Action</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="confirm-button">Confirm</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
