import React, { useState } from 'react';
import styles from './FamilyInfo.module.css';

export default function FamilyInfo() {
    const [familyInfo, setFamilyInfo] = useState({
        mother: { name: '', city: '', street: '', streetNumber: '', buildingNumber: '', entrance: '', apartmentNumber: '', telephoneNumber: '' },
        father: { name: '', city: '', street: '', streetNumber: '', buildingNumber: '', entrance: '', apartmentNumber: '', telephoneNumber: '' },
        siblings: [],
        spouse: { name: '', city: '', street: '', streetNumber: '', buildingNumber: '', entrance: '', apartmentNumber: '', telephoneNumber: '' },
        children: []
    });

    const [visibleSections, setVisibleSections] = useState({
        mother: false,
        father: false,
        siblings: false,
        spouse: false,
        children: false
    });

    const handleToggleSection = (section) => {
        setVisibleSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const handleChange = (event, key, index) => {
        const { name, value } = event.target;
        if (['mother', 'father', 'spouse'].includes(key)) {
            setFamilyInfo(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    [name]: value
                }
            }));
        } else {
            const updatedArray = [...familyInfo[key]];
            updatedArray[index] = {
                ...updatedArray[index],
                [name]: value
            };
            setFamilyInfo(prevState => ({
                ...prevState,
                [key]: updatedArray
            }));
        }
    };

    const handleAddMember = (key, fields) => {
        setFamilyInfo(prevState => ({
            ...prevState,
            [key]: [...prevState[key], { ...fields }]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Family Information:', familyInfo);
    };

    return (
        <>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.familyForm}>
                    <h2>Family Information</h2>
                    
                    {Object.entries(visibleSections).map(([key, isVisible]) => (
                        <div key={key}>
                            <button type="button" onClick={() => handleToggleSection(key)}>
                                {isVisible ? `Hide ${key.charAt(0).toUpperCase() + key.slice(1)}` : `Add ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            </button>
                            {isVisible && (
                                <div className={styles.memberSection}>
                                    <h3>{key.charAt(0).toUpperCase() + key.slice(1)} Details</h3>
                                    {Array.isArray(familyInfo[key]) ? (
                                        familyInfo[key].map((member, index) => (
                                            <div key={index}>
                                                {Object.entries(member).map(([field, value]) => (
                                                    <label key={field}>
                                                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                                                        <input
                                                            type={field === 'dateOfBirth' ? 'date' : 'text'}
                                                            name={field}
                                                            value={value}
                                                            onChange={(e) => handleChange(e, key, index)}
                                                        />
                                                    </label>
                                                ))}
                                            </div>
                                        ))
                                    ) : (
                                        Object.entries(familyInfo[key]).map(([field, value]) => (
                                            <label key={field}>
                                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={value}
                                                    onChange={(e) => handleChange(e, key)}
                                                />
                                            </label>
                                        ))
                                    )}
                                    {key === 'siblings' || key === 'children' ? (
                                        <button type="button" onClick={() => handleAddMember(key, key === 'children' ? { name: '', dateOfBirth: '' } : { name: '', studyPlace: '' })}>
                                            Add Another {key.charAt(0).toUpperCase() + key.slice(1).slice(0, -1)}
                                        </button>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    ))}

                    <button type="submit">Submit Information</button>
                </form>
            </div>
        </>
    );
}