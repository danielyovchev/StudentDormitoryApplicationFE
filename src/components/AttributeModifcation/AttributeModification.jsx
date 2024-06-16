import React, { useState, useEffect } from 'react';
import AttributeItem from './AttributeItem';
import styles from './AttributeModification.module.css';
import { API_BASE_URL } from '../../utils/routeConstants';

export default function AttributeModification() {
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        // Fetch attributes from the server
        fetch(API_BASE_URL + '/attributes/get')
            .then(response => response.json())
            .then(data => setAttributes(data))
            .catch(error => console.error('Error fetching attributes:', error));
    }, []);

    const handleChange = (event, attributeId) => {
        const newValue = event.target.value;
        setAttributes(prevAttributes => prevAttributes.map(attr =>
            attr.id === attributeId ? { ...attr, value: newValue } : attr
        ));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Updated Attributes:', attributes);
        // Send the updated attributes to the server
        fetch(API_BASE_URL + '/attributes/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attributes)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Attributes updated successfully:', data);
            })
            .catch(error => console.error('Error updating attributes:', error));
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
                {attributes.map(({ id, name, description, value }) => (
                    <AttributeItem
                        key={id}
                        name={name}
                        description={description}
                        value={value}
                        onChange={(e) => handleChange(e, id)}
                    />
                ))}
                <button type="submit" className={styles.submitButton}>Save Changes</button>
            </form>
        </div>
    );
}
