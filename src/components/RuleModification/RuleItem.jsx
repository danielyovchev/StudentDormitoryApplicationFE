import React from 'react';
import styles from './RuleItem.module.css';

export default function RuleItem({ name, description, defaultScore, isActive, onScoreChange, onActiveChange }) {
    return (
        <div className={styles.ruleRow}>
            <div className={styles.ruleColumn}>{name}</div>
            <div className={styles.ruleColumn}>{description}</div>
            <div className={styles.ruleColumn}>
                <input
                    type="number"
                    value={defaultScore}
                    onChange={onScoreChange}
                    min="0"
                    max="100"
                />
            </div>
            <div className={styles.ruleColumn}>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={onActiveChange}
                />
            </div>
        </div>
    );
}
