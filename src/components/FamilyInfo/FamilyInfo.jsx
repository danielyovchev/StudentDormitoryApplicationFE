import React, { useState, useEffect, useContext } from 'react';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ParentForm from './ParentForm';
import SpouseForm from './SpouseForm';
import SiblingForm from './SiblingForm';
import ChildForm from './ChildForm';
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
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        const fetchParentData = async () => {
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

        const fetchSiblingsData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/siblings`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSiblings(data || []);
                } else {
                    console.error('Failed to fetch siblings data');
                }
            } catch (error) {
                console.error('Error fetching siblings data:', error);
            }
        };

        const fetchChildrenData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/children`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setChildren(data || []);
                } else {
                    console.error('Failed to fetch children data');
                }
            } catch (error) {
                console.error('Error fetching children data:', error);
            }
        };

        fetchParentData();
        fetchSpouseData();
        fetchSiblingsData();
        fetchChildrenData();
    }, [studentNumber]);

    const handleAddSibling = (newSibling) => {
        setSiblings([...siblings, newSibling]);
    };

    const handleAddChild = (newChild) => {
        setChildren([...children, newChild]);
    };

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
                <SiblingForm siblings={siblings} onAddSibling={handleAddSibling} />
            </div>
            <div className={styles.formSection}>
                <ChildForm children={children} onAddChild={handleAddChild} />
            </div>
        </div>
    );
}
