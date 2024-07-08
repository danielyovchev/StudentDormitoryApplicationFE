import React, { useState, useEffect } from 'react';
import AttributeItem from './AttributeItem';
import styles from './AttributeModification.module.css';
import { API_BASE_URL } from '../../utils/routeConstants';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function AttributeModification() {
    const { t } = useTranslation();
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchAttributes = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/attributes/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAttributes(data);
            } catch (error) {
                toast.error(`${t('attributeModification.fetchError')}: ${error}`);
            }
        };

        fetchAttributes();
    }, [t]);

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
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success(`${t('attributeModification.updateSuccess')}: ${data}`);
        } catch (error) {
            toast.error(`${t('attributeModification.updateError')}: ${error}`);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>{t('attributeModification.adjustAttributeValues')}</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.attributeRow}>
                    <div className={styles.attributeColumn}><strong>{t('attributeModification.name')}</strong></div>
                    <div className={styles.attributeColumn}><strong>{t('attributeModification.description')}</strong></div>
                    <div className={styles.attributeColumn}><strong>{t('attributeModification.value')}</strong></div>
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
                <button type="submit" className={styles.submitButton}>{t('attributeModification.saveChanges')}</button>
            </form>
        </div>
    );
}
