import React, { useContext, useState } from 'react';
import { FamilyContext } from '../../contexts/FamilyContext';
import styles from './SiblingsForm.module.css';

export default function SiblingsForm() {
    const { familyData, setFamilyData } = useContext(FamilyContext);
    const [sibling, setSibling] = useState({ name: '', age: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSibling(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSibling = () => {
        setFamilyData(prevState => ({
            ...prevState,
            siblings: [...prevState.siblings, sibling]
        }));
        setSibling({ name: '', age: '' });
    };

    return (
        <div className={styles.siblingsForm}>
            <h3>Siblings</h3>
            <label>
                Name:
                <input type="text" name="name" value={sibling.name} onChange={handleChange} />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={sibling.age} onChange={handleChange} />
            </label>
            <button type="button" onClick={handleAddSibling}>Add Sibling</button>
            <ul>
                {familyData.siblings.map((s, index) => (
                    <li key={index}>{s.name} - {s.age} years old</li>
                ))}
            </ul>
        </div>
    );
}
