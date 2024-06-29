import React, { useContext, useState } from 'react';
import { FamilyContext } from '../../contexts/FamilyContext';
import styles from './ParentForm.module.css';

export default function ParentForm({ parentType }) {
    const { familyData, setFamilyData } = useContext(FamilyContext);
    const [parent, setParent] = useState({ name: '', age: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveParent = () => {
        setFamilyData(prevState => ({
            ...prevState,
            [parentType]: parent
        }));
        setParent({ name: '', age: '' });
    };

    return (
        <div className={styles.parentForm}>
            <h3>{parentType.charAt(0).toUpperCase() + parentType.slice(1)}</h3>
            <label>
                Name:
                <input type="text" name="name" value={parent.name} onChange={handleChange} />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={parent.age} onChange={handleChange} />
            </label>
            <button type="button" onClick={handleSaveParent}>Save {parentType.charAt(0).toUpperCase() + parentType.slice(1)}</button>
        </div>
    );
}
