import { useContext, useState } from 'react';
import { FamilyContext } from '../../contexts/FamilyContext';
import styles from './ChildrenForm.module.css';

export default function ChildrenForm() {
    const { familyData, setFamilyData } = useContext(FamilyContext);
    const [child, setChild] = useState({ name: '', age: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChild(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddChild = () => {
        setFamilyData(prevState => ({
            ...prevState,
            children: [...prevState.children, child]
        }));
        setChild({ name: '', age: '' });
    };

    return (
        <div className={styles.childrenForm}>
            <h3>Children</h3>
            <label>
                Name:
                <input type="text" name="name" value={child.name} onChange={handleChange} />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={child.age} onChange={handleChange} />
            </label>
            <button type="button" onClick={handleAddChild}>Add Child</button>
            <ul>
                {familyData.children.map((c, index) => (
                    <li key={index}>{c.name} - {c.age} years old</li>
                ))}
            </ul>
        </div>
    );
}
