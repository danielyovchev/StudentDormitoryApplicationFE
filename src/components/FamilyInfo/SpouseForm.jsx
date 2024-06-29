import React, { useContext, useState } from 'react';
import { FamilyContext } from '../../contexts/FamilyContext';
import styles from './SpouseForm.module.css';

export default function SpouseForm() {
    const { familyData, setFamilyData } = useContext(FamilyContext);
    const [spouse, setSpouse] = useState({ name: '', age: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSpouse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveSpouse = () => {
        setFamilyData(prevState => ({
            ...prevState,
            spouse
        }));
        setSpouse({ name: '', age: '' });
    };

    return (
        <div className={styles.spouseForm}>
            <h3>Spouse</h3>
            <label>
                Name:
                <input type="text" name="name" value={spouse.name} onChange={handleChange} />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={spouse.age} onChange={handleChange} />
            </label>
            <button type="button" onClick={handleSaveSpouse}>Save Spouse</button>
        </div>
    );
}
