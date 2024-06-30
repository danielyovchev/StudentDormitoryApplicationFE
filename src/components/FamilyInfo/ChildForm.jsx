import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './ChildForm.module.css';

export default function ChildForm({ children, onAddChild }) {
    const { keycloak } = useAuth();
    const [childData, setChildData] = useState({
        name: '',
        birthDate: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChildData((prevState) => ({
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
            const response = await fetch(`${API_BASE_URL}/upload/student/child`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...childData,
                    studentNumber: keycloak.tokenParsed.studentNumber
                })
            });

            if (response.ok) {
                onAddChild(childData);
                toast.success('Child information submitted successfully!');
                setChildData({ name: '', birthDate: '' });
            } else {
                const responseData = await response.json();
                toast.error(responseData.message || 'Child information submission failed');
            }
        } catch (error) {
            console.error('Error submitting child information:', error);
            toast.error('Error submitting child information');
        }
    };

    return (
        <div>
            <h3>Child Information</h3>
            <div className={styles.existingData}>
                {children.map((child, index) => (
                    <div key={index} className={styles.dataItem}>
                        <p><strong>Name:</strong> {child.name}</p>
                        <p><strong>Birth Date:</strong> {child.birthDate}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={childData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Birth Date:
                    <input
                        type="date"
                        name="birthDate"
                        value={childData.birthDate}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
}
