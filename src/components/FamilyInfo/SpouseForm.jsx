import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './SpouseForm.module.css';

export default function SpouseForm({ existingSpouse, onSpouseAdded }) {
    const { keycloak } = useAuth();
    const [spouseData, setSpouseData] = useState({
        name: '',
        city: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (existingSpouse) {
            setSpouseData(existingSpouse);
        }
    }, [existingSpouse]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSpouseData((prevState) => ({
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
            const response = await fetch(`${API_BASE_URL}/upload/student/spouse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...spouseData, studentNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onSpouseAdded(spouseData);
                toast.success('Spouse information submitted successfully!');
            } else {
                const responseData = await response.json();
                toast.error(responseData.message || 'Spouse information submission failed');
            }
        } catch (error) {
            console.error('Error submitting spouse information:', error);
            toast.error('Error submitting spouse information');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Spouse Information</h3>
            <label className={styles.label}>
                Name:
                <input type="text" name="name" value={spouseData.name} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
                City:
                <input type="text" name="city" value={spouseData.city} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
                Address:
                <input type="text" name="address" value={spouseData.address} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
                Phone Number:
                <input type="text" name="phoneNumber" value={spouseData.phoneNumber} onChange={handleChange} required className={styles.input} />
            </label>
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
}
