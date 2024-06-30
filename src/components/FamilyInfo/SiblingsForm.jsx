import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './SiblingsForm.module.css';

export default function SiblingsForm({ onAddSibling }) {
    const { keycloak } = useAuth();
    const [siblingData, setSiblingData] = useState({
        name: '',
        isStudying: false
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSiblingData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
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
            const response = await fetch(`${API_BASE_URL}/upload/student/sibling`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...siblingData, studentPersonalNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onAddSibling(siblingData);
                toast.success('Sibling information submitted successfully!');
            } else {
                const responseData = await response.json();
                toast.error(responseData.message || 'Sibling information submission failed');
            }
        } catch (error) {
            console.error('Error submitting sibling information:', error);
            toast.error('Error submitting sibling information');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Sibling Information</h3>
            <label className={styles.label}>
                Name:
                <input type="text" name="name" value={siblingData.name} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
                Is Studying:
                <input type="checkbox" name="isStudying" checked={siblingData.isStudying} onChange={handleChange} className={styles.checkbox} />
            </label>
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
}
