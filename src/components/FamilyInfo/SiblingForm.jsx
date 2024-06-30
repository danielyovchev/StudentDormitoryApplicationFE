import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './SiblingForm.module.css';

export default function SiblingForm({ siblings, onAddSibling }) {
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
                body: JSON.stringify({
                    ...siblingData,
                    studentPersonalNumber: keycloak.tokenParsed.studentNumber
                })
            });

            if (response.ok) {
                onAddSibling(siblingData);
                toast.success('Sibling information submitted successfully!');
                setSiblingData({ name: '', isStudying: false });
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
        <div>
            <h3>Sibling Information</h3>
            <div className={styles.existingData}>
                {siblings.map((sibling, index) => (
                    <div key={index} className={styles.dataItem}>
                        <p><strong>Name:</strong> {sibling.name}</p>
                        <p><strong>Studying:</strong> {sibling.isStudying ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={siblingData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Is Studying:
                    <input
                        type="checkbox"
                        name="isStudying"
                        checked={siblingData.isStudying}
                        onChange={handleChange}
                        className={styles.checkbox}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}
