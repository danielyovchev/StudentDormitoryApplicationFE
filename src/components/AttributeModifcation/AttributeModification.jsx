import React, { useState, useEffect } from 'react';
import AttributeItem from './AttributeItem';
import styles from './AttributeModification.module.css';
import { API_BASE_URL } from '../../utils/routeConstants';

export default function AttributeModification() {
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchAttributes = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }
            console.log('Using token:', token); // Debugging line

            try {
                const response = await fetch(`${API_BASE_URL}/attributes/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include' // Ensure credentials are included
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAttributes(data);
            } catch (error) {
                console.error('Error fetching attributes:', error);
            }
        };

        fetchAttributes();
    }, []);

    const handleChange = (event, attributeId) => {
        const newValue = event.target.value;
        setAttributes(prevAttributes => prevAttributes.map(attr =>
            attr.id === attributeId ? { ...attr, value: newValue } : attr
        ));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Updated Attributes:', attributes);

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/attributes/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(attributes),
                credentials: 'include' // Ensure credentials are included
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Attributes updated successfully:', data);
        } catch (error) {
            console.error('Error updating attributes:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Adjust Attribute Values</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.attributeRow}>
                    <div className={styles.attributeColumn}><strong>Name</strong></div>
                    <div className={styles.attributeColumn}><strong>Description</strong></div>
                    <div className={styles.attributeColumn}><strong>Value</strong></div>
                </div>
                {attributes.map(({ id, name, description, defaultValue }) => (
                    <AttributeItem
                        key={id}
                        name={name}
                        description={description}
                        value={defaultValue}
                        onChange={(e) => handleChange(e, id)}
                    />
                ))}
                <button type="submit" className={styles.submitButton}>Save Changes</button>
            </form>
        </div>
    );
}
