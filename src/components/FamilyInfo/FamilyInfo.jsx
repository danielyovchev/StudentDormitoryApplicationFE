import React, { useContext } from 'react';
import { FamilyContext } from '../../contexts/FamilyContext';
import ChildrenForm from './ChildrenForm';
import SpouseForm from './SpouseForm';
import ParentForm from './ParentForm';
import SiblingsForm from './SiblingsForm';
import { API_BASE_URL } from '../../utils/routeConstants';
import { toast } from 'react-toastify';
import styles from './FamilyInfo.module.css';

export default function FamilyInfo() {
    const { familyData } = useContext(FamilyContext);

    const handleSubmit = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            // Submitting children
            for (const child of familyData.children) {
                await fetch(`${API_BASE_URL}/upload/family/children`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(child)
                });
            }

            // Submitting spouse
            if (Object.keys(familyData.spouse).length > 0) {
                await fetch(`${API_BASE_URL}/upload/family/spouse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(familyData.spouse)
                });
            }

            // Submitting father
            if (Object.keys(familyData.father).length > 0) {
                await fetch(`${API_BASE_URL}/upload/family/father`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(familyData.father)
                });
            }

            // Submitting mother
            if (Object.keys(familyData.mother).length > 0) {
                await fetch(`${API_BASE_URL}/upload/family/mother`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(familyData.mother)
                });
            }

            // Submitting siblings
            for (const sibling of familyData.siblings) {
                await fetch(`${API_BASE_URL}/upload/family/siblings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(sibling)
                });
            }

            toast.success('Family data submitted successfully!');
        } catch (error) {
            console.error('Error submitting family data:', error);
            toast.error('Error submitting family data');
        }
    };

    return (
        <div className={styles.familyFormContainer}>
            <h2>Family Information Form</h2>
            <ChildrenForm />
            <SpouseForm />
            <ParentForm parentType="father" />
            <ParentForm parentType="mother" />
            <SiblingsForm />
            <button onClick={handleSubmit}>Submit Family Information</button>
        </div>
    );
}