import React from 'react';
import styles from './AttributeItem.module.css';

export default function AttributeItem({ name, description, value, onChange }) {
    return (
        <div className={styles.attributeRow}>
            <div className={styles.attributeColumn}>{name}</div>
            <div className={styles.attributeColumn}>{description}</div>
            <div className={styles.attributeColumn}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
