import React from 'react';
import styles from './AttributeItem.module.css';

export default function AttributeItem({ name, value, onChange }) {
    return (
        <div className={styles.attribute}>
            <label>
                {name}:
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}
