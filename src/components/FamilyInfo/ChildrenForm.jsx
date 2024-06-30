import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './FamilyInfo.module.css';

export default function ChildrenForm({ onAddChild }) {
    const { keycloak } = useAuth();
    const [child, setChild] = useState({ name: '', birthDate: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/upload/student/child`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                },
                body: JSON.stringify({ ...child, studentNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onAddChild(child);
                setChild({ name: '', birthDate: '' });
                toast.success('Child added successfully!');
            } else {
                console.error('Failed to add child');
                toast.error('Failed to add child');
            }
        } catch (error) {
            console.error('Error adding child:', error);
            toast.error('Error adding child');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Add Child</h3>
            <label>
                Name:
                <input type="text" name="name" value={child.name} onChange={handleChange} required />
            </label>
            <label>
                Birth Date:
                <input type="date" name="birthDate" value={child.birthDate} onChange={handleChange} required />
            </label>
            <button type="submit">Add Child</button>
        </form>
    );
}
