import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './ParentForm.module.css';

export default function ParentForm({ onAddParent, parentType }) {
    const { keycloak } = useAuth();
    const [parentData, setParentData] = useState({
        name: '',
        city: '',
        street: '',
        streetNumber: '',
        buildingNumber: '',
        entrance: '',
        apartment: '',
        phoneNumber: '',
        parentType
    });

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
            const response = await fetch(`${API_BASE_URL}/upload/student/family`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...parentData, studentPersonalNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onAddParent(parentData, parentType);
                toast.success('Parent information submitted successfully!');
            } else {
                const responseData = await response.json();
                toast.error(responseData.message || 'Parent information submission failed');
            }
        } catch (error) {
            console.error('Error submitting parent information:', error);
            toast.error('Error submitting parent information');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>{parentType.charAt(0).toUpperCase() + parentType.slice(1)} Information</h3>
            <label>
                Name:
                <input type="text" name="name" value={parentData.name} onChange={handleChange} required />
            </label>
            <label>
                City:
                <input type="text" name="city" value={parentData.city} onChange={handleChange} required />
            </label>
            <label>
                Street:
                <input type="text" name="street" value={parentData.street} onChange={handleChange} required />
            </label>
            <label>
                Street Number:
                <input type="number" name="streetNumber" value={parentData.streetNumber} onChange={handleChange} required />
            </label>
            <label>
                Building Number:
                <input type="number" name="buildingNumber" value={parentData.buildingNumber} onChange={handleChange} required />
            </label>
            <label>
                Entrance:
                <input type="number" name="entrance" value={parentData.entrance} onChange={handleChange} required />
            </label>
            <label>
                Apartment:
                <input type="number" name="apartment" value={parentData.apartment} onChange={handleChange} required />
            </label>
            <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={parentData.phoneNumber} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
