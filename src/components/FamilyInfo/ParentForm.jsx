import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './ParentForm.module.css';

export default function ParentForm({ parentType, existingParent, onParentAdded }) {
    const { keycloak } = useAuth();
    const [parentData, setParentData] = useState({
        name: '',
        city: '',
        address: '',
        phoneNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (existingParent) {
            setParentData({
                name: existingParent.name || '',
                city: existingParent.city || '',
                address: existingParent.address || '',
                phoneNumber: existingParent.phoneNumber || ''
            });
            setIsEditing(false);
        } else {
            setIsEditing(true); // Allow editing if there's no existing parent
        }
    }, [existingParent]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParentData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/upload/student/parent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...parentData,
                    studentNumber: keycloak.tokenParsed.studentNumber,
                    parentType: parentType.toUpperCase()
                })
            });

            if (response.ok) {
                onParentAdded(parentData);
                toast.success(`${parentType} information submitted successfully!`);
                setIsEditing(false);
            } else {
                const responseData = await response.json();
                toast.error(responseData.message || `${parentType} information submission failed`);
            }
        } catch (error) {
            console.error(`Error submitting ${parentType} information:`, error);
            toast.error(`Error submitting ${parentType} information`);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>{parentType} Information</h3>
            <label className={styles.label}>
                Name:
                <input
                    type="text"
                    name="name"
                    value={parentData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    disabled={!isEditing}
                />
            </label>
            <label className={styles.label}>
                City:
                <input
                    type="text"
                    name="city"
                    value={parentData.city}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    disabled={!isEditing}
                />
            </label>
            <label className={styles.label}>
                Address:
                <input
                    type="text"
                    name="address"
                    value={parentData.address}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    disabled={!isEditing}
                />
            </label>
            <label className={styles.label}>
                Phone Number:
                <input
                    type="text"
                    name="phoneNumber"
                    value={parentData.phoneNumber}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    disabled={!isEditing}
                />
            </label>
            {!isEditing ? (
                <button type="button" onClick={handleEdit} className={styles.editButton}>Edit</button>
            ) : (
                <button type="submit" className={styles.submitButton}>Submit</button>
            )}
        </form>
    );
}
