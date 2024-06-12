import React, { useState } from 'react';
import RuleItem from './RuleItem';
import styles from './RuleModification.module.css';

export default function RuleModification() {
    const [rules, setRules] = useState({
        rule1: { description: "Weight of academic performance", value: 70 },
        rule2: { description: "Weight of proximity to campus", value: 20 },
        rule3: { description: "Weight of financial need", value: 10 }
    });

    const handleChange = (event, ruleKey) => {
        const newValue = event.target.value;
        setRules(prevRules => ({
            ...prevRules,
            [ruleKey]: {
                ...prevRules[ruleKey],
                value: newValue
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Updated Rules:', rules);
        // Typically here you would send the updated rules to the server
    };

    return (
        <div className={styles.formContainer}>
            <h2>Adjust Classification Rules</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(rules).map(([key, { description, value }]) => (
                    <RuleItem
                        key={key}
                        description={description}
                        value={value}
                        onChange={(e) => handleChange(e, key)}
                    />
                ))}
                <button type="submit" className={styles.submitButton}>Save Changes</button>
            </form>
        </div>
    );
}
