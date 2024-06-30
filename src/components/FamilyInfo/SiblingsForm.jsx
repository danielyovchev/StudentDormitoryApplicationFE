import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './FamilyInfo.module.css';

export default function SiblingsForm({ onAddSibling }) {
    const { keycloak } = useAuth();
    const [sibling, setSibling] = useState({ name: '', isStudying: false });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSibling((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/upload/student/sibling`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                },
                body: JSON.stringify({ ...sibling, studentNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onAddSibling(sibling);
                setSibling({ name: '', isStudying: false });
                toast.success('Sibling added successfully!');
            } else {
                console.error('Failed to add sibling');
                toast.error('Failed to add sibling');
            }
        } catch (error) {
            console.error('Error adding sibling:', error);
            toast.error('Error adding sibling');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Add Sibling</h3>
            <label>
                Name:
                <input type="text" name="name" value={sibling.name} onChange={handleChange} required />
            </label>
            <label>
                Is Studying:
                <input type="checkbox" name="isStudying" checked={sibling.isStudying} onChange={handleChange} />
            </label>
            <button type="submit">Add Sibling</button>
        </form>
    );
}
