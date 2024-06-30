import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './ChildrenForm.module.css';

export default function ChildrenForm({ onAddChild }) {
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
                body: JSON.stringify({ ...childData, studentNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onAddChild(childData);
                toast.success('Child information submitted successfully!');
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
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Child Information</h3>
            <label className={styles.label}>
                Name:
                <input type="text" name="name" value={childData.name} onChange={handleChange} required className={styles.input} />
            </label>
            <label className={styles.label}>
                Birth Date:
                <input type="date" name="birthDate" value={childData.birthDate} onChange={handleChange} required className={styles.input} />
            </label>
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
}
