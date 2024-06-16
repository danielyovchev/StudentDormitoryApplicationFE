import React, { useState, useEffect } from 'react';
import RuleItem from './RuleItem';
import styles from './RuleModification.module.css';
import { API_BASE_URL } from '../../utils/routeConstants';

export default function RuleModification() {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        // Fetch rules from the server
        fetch(API_BASE_URL+'/rule/get')
            .then(response => response.json())
            .then(data => setRules(data))
            .catch(error => console.error('Error fetching rules:', error));
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Updated Rules:', rules);
        const updateRequest = { rules: rules };
        // Send the updated rules to the server
        fetch(API_BASE_URL+'/rule/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateRequest)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Rules updated successfully:', data);
            })
            .catch(error => console.error('Error updating rules:', error));
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
