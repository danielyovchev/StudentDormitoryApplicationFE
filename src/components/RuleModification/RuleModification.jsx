import React, { useState, useEffect } from 'react';
import RuleItem from './RuleItem';
import styles from './RuleModification.module.css';
import { API_BASE_URL } from '../../utils/routeConstants';
import { toast } from 'react-toastify';

export default function RuleModification() {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const fetchRules = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }
            console.log('Using token:', token); // Debugging line

            try {
                const response = await fetch(`${API_BASE_URL}/rule/get`, {
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
                setRules(data);
            } catch (error) {
                console.error('Error fetching rules:', error);
            }
        };

        fetchRules();
    }, []);

    const handleScoreChange = (event, ruleId) => {
        const newValue = event.target.value;
        setRules(prevRules => prevRules.map(rule =>
            rule.id === ruleId ? { ...rule, defaultScore: newValue } : rule
        ));
    };

    const handleActiveChange = (event, ruleId) => {
        const newValue = event.target.checked;
        setRules(prevRules => prevRules.map(rule =>
            rule.id === ruleId ? { ...rule, isActive: newValue } : rule
        ));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateRequest = { rules: rules };

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/rule/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateRequest),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success('Rules updated successfully:', data);
        } catch (error) {
            toast.error('Error updating rules:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Adjust Classification Rules</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.ruleRow}>
                    <div className={styles.ruleColumn}><strong>Name</strong></div>
                    <div className={styles.ruleColumn}><strong>Description</strong></div>
                    <div className={styles.ruleColumn}><strong>Default Score</strong></div>
                    <div className={styles.ruleColumn}><strong>Active</strong></div>
                </div>
                {rules.map(({ id, name, description, defaultScore, isActive }) => (
                    <RuleItem
                        key={id}
                        name={name}
                        description={description}
                        defaultScore={defaultScore}
                        isActive={isActive}
                        onScoreChange={(e) => handleScoreChange(e, id)}
                        onActiveChange={(e) => handleActiveChange(e, id)}
                    />
                ))}
                <button type="submit" className={styles.submitButton}>Save Changes</button>
            </form>
        </div>
    );
}
