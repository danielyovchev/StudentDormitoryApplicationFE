import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import styles from './FamilyInfo.module.css';

export default function SpouseForm({ onAddSpouse }) {
    const { keycloak } = useAuth();
    const [spouse, setSpouse] = useState({
        name: '',
        city: '',
        street: '',
        streetNumber: '',
        buildingNumber: '',
        entrance: '',
        apartment: '',
        phoneNumber: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSpouse((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/upload/student/spouse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                },
                body: JSON.stringify({ ...spouse, studentNumber: keycloak.tokenParsed.studentNumber })
            });

            if (response.ok) {
                onAddSpouse(spouse);
                setSpouse({
                    name: '',
                    city: '',
                    street: '',
                    streetNumber: '',
                    buildingNumber: '',
                    entrance: '',
                    apartment: '',
                    phoneNumber: ''
                });
                toast.success('Spouse added successfully!');
            } else {
                console.error('Failed to add spouse');
                toast.error('Failed to add spouse');
            }
        } catch (error) {
            console.error('Error adding spouse:', error);
            toast.error('Error adding spouse');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Add Spouse</h3>
            <label>
                Name:
                <input type="text" name="name" value={spouse.name} onChange={handleChange} required />
            </label>
            <label>
                City:
                <input type="text" name="city" value={spouse.city} onChange={handleChange} required />
            </label>
            <label>
                Street:
                <input type="text" name="street" value={spouse.street} onChange={handleChange} required />
            </label>
            <label>
                Street Number:
                <input type="number" name="streetNumber" value={spouse.streetNumber} onChange={handleChange} required />
            </label>
            <label>
                Building Number:
                <input type="number" name="buildingNumber" value={spouse.buildingNumber} />
            </label>
            <label>
                Entrance:
                <input type="number" name="entrance" value={spouse.entrance} />
            </label>
            <label>
                Apartment:
                <input type="number" name="apartment" value={spouse.apartment} />
            </label>
            <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={spouse.phoneNumber} onChange={handleChange} required />
            </label>
            <button type="submit">Add Spouse</button>
        </form>
    );
}
