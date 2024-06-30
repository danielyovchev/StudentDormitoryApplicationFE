import React, { useState, useEffect, useContext } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ParentForm from './ParentForm';
import SpouseForm from './SpouseForm';
import SiblingForm from './SiblingsForm';
import ChildForm from './ChildrenForm';
import { StudentContext } from '../../contexts/StudentContext';
import styles from './FamilyInfo.module.css';

export default function FamilyInfo() {
    const { keycloak } = useAuth();
    const { studentNumber } = useContext(StudentContext);
    const [existingMother, setExistingMother] = useState(null);
    const [existingFather, setExistingFather] = useState(null);
    const [existingSpouse, setExistingSpouse] = useState(null);
    const [siblings, setSiblings] = useState([]);
    const [children, setChildren] = useState([]);

    useEffect(() => {
        const fetchParentData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/parent`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const mother = data.find(parent => parent.parentType === 'MOTHER');
                    const father = data.find(parent => parent.parentType === 'FATHER');
                    setExistingMother(mother || null);
                    setExistingFather(father || null);
                } else {
                    console.error('Failed to fetch parent data');
                }
            } catch (error) {
                console.error('Error fetching parent data:', error);
            }
        };

        const fetchSpouseData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/spouse`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setExistingSpouse(data || null);
                } else {
                    console.error('Failed to fetch spouse data');
                }
            } catch (error) {
                console.error('Error fetching spouse data:', error);
            }
        };

        fetchParentData();
        fetchSpouseData();
    }, [studentNumber]);

    return (
        <div className={styles.familyInfoContainer}>
            <h2>Family Information</h2>
            <div className={styles.formSection}>
                <ParentForm parentType="MOTHER" existingParent={existingMother} onParentAdded={setExistingMother} />
                <ParentForm parentType="FATHER" existingParent={existingFather} onParentAdded={setExistingFather} />
            </div>
            <div className={styles.formSection}>
                <SpouseForm existingSpouse={existingSpouse} onSpouseAdded={setExistingSpouse} />
            </div>
            <div className={styles.formSection}>
                <SiblingForm siblings={siblings} setSiblings={setSiblings} />
            </div>
            <div className={styles.formSection}>
                <ChildForm children={children} setChildren={setChildren} />
            </div>
        </div>
    );
}
