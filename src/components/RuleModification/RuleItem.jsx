import React from 'react';
import styles from './RuleItem.module.css';

export default function RuleItem({ description, value, onChange }) {
    return (
        <div className={styles.rule}>
            <label>
                {description}:
                <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    min="0"
                    max="100"
                />
            </label>
        </div>
    );
}
