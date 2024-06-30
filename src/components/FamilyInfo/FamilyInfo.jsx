import React, { useContext, useEffect, useState } from 'react';
import { FamilyContext } from '../../contexts/FamilyContext';
import ChildrenForm from './ChildrenForm';
import SpouseForm from './SpouseForm';
import ParentForm from './ParentForm';
import SiblingsForm from './SiblingsForm';
import { API_BASE_URL } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import styles from './FamilyInfo.module.css';
import { toast } from 'react-toastify';

export default function FamilyInfo() {
    const { familyData, setFamilyData } = useContext(FamilyContext);
    const { keycloak } = useAuth();
    const [spouseExists, setSpouseExists] = useState(false);
    const [parentsExist, setParentsExist] = useState({ mother: false, father: false });

    useEffect(() => {
        if (keycloak.token) {
            fetchSpouse();
            fetchParents();
        }
    }, [keycloak.token]);

    const fetchSpouse = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get/student/${keycloak.tokenParsed.studentNumber}/spouse`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setFamilyData((prevState) => ({
                        ...prevState,
                        spouse: data
                    }));
                    setSpouseExists(true);
                }
            } else {
                console.error('Failed to fetch spouse');
            }
        } catch (error) {
            console.error('Error fetching spouse:', error);
        }
    };

    const fetchParents = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get/student/${keycloak.tokenParsed.studentNumber}/parent`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    const mother = data.find((parent) => parent.parentType === 'MOTHER');
                    const father = data.find((parent) => parent.parentType === 'FATHER');

                    setFamilyData((prevState) => ({
                        ...prevState,
                        mother,
                        father
                    }));
                    setParentsExist({
                        mother: !!mother,
                        father: !!father
                    });
                }
            } else {
                console.error('Failed to fetch parents');
            }
        } catch (error) {
            console.error('Error fetching parents:', error);
        }
    };

    const handleAddChild = (child) => {
        setFamilyData((prevState) => ({
            ...prevState,
            children: [...prevState.children, child]
        }));
        toast.success('Child added successfully!');
    };

    const handleAddSibling = (sibling) => {
        setFamilyData((prevState) => ({
            ...prevState,
            siblings: [...prevState.siblings, sibling]
        }));
        toast.success('Sibling added successfully!');
    };

    const handleAddSpouse = (spouse) => {
        setFamilyData((prevState) => ({
            ...prevState,
            spouse
        }));
        setSpouseExists(true);
        toast.success('Spouse added successfully!');
    };

    const handleAddParent = (parent, type) => {
        setFamilyData((prevState) => ({
            ...prevState,
            [type]: parent
        }));
        setParentsExist((prevState) => ({
            ...prevState,
            [type]: true
        }));
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
    };

    return (
        <div className={styles.familyFormContainer}>
            <h2>Family Information</h2>
            <ChildrenForm onAddChild={handleAddChild} />
            <SiblingsForm onAddSibling={handleAddSibling} />
            {spouseExists ? (
                <div className={styles.infoContainer}>
                    <h3>Spouse Information</h3>
                    <p><strong>Name:</strong> {familyData.spouse.name}</p>
                    <p><strong>City:</strong> {familyData.spouse.city}</p>
                    <p><strong>Street:</strong> {familyData.spouse.street}</p>
                    <p><strong>Street Number:</strong> {familyData.spouse.streetNumber}</p>
                    <p><strong>Phone Number:</strong> {familyData.spouse.phoneNumber}</p>
                </div>
            ) : (
                <SpouseForm onAddSpouse={handleAddSpouse} />
            )}
            {parentsExist.mother ? (
                <div className={styles.infoContainer}>
                    <h3>Mother's Information</h3>
                    <p><strong>Name:</strong> {familyData.mother.name}</p>
                    <p><strong>City:</strong> {familyData.mother.city}</p>
                    <p><strong>Street:</strong> {familyData.mother.street}</p>
                    <p><strong>Street Number:</strong> {familyData.mother.streetNumber}</p>
                    <p><strong>Phone Number:</strong> {familyData.mother.phoneNumber}</p>
                </div>
            ) : (
                <ParentForm onAddParent={handleAddParent} parentType="mother" />
            )}
            {parentsExist.father ? (
                <div className={styles.infoContainer}>
                    <h3>Father's Information</h3>
                    <p><strong>Name:</strong> {familyData.father.name}</p>
                    <p><strong>City:</strong> {familyData.father.city}</p>
                    <p><strong>Street:</strong> {familyData.father.street}</p>
                    <p><strong>Street Number:</strong> {familyData.father.streetNumber}</p>
                    <p><strong>Phone Number:</strong> {familyData.father.phoneNumber}</p>
                </div>
            ) : (
                <ParentForm onAddParent={handleAddParent} parentType="father" />
            )}
        </div>
    );
}
