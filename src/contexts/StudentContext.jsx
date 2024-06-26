import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    const { keycloak, initialized, studentNumber } = useAuth();

    const [studentData, setStudentData] = useState({
        educationForm: 'regular',
        faculty: 'FITA',
        specialty: 'SIT',
        city: '',
        municipality: '',
        street: '',
        streetNumber: '',
        buildingNumber: '18',
        roomNumber: '',
        entrance: '',
        apartment: '',
        personalID: '',
        phoneNumber: '',
        grade: '',
        yearOfStudy: 'first',
        preserveRoom: false // Checkbox for preserving room
    });

    const [formStatus, setFormStatus] = useState({
        studentForm: false,
        familyForm: false
    });

    useEffect(() => {
        if (initialized && keycloak.authenticated && studentNumber) {
            setStudentData(prevState => ({
                ...prevState,
                studentNumber
            }));
        } else if (initialized && !studentNumber) {
            toast.error('Student number not found in Keycloak token.');
        }
    }, [initialized, keycloak, studentNumber]);

    return (
        <StudentContext.Provider value={{ studentData, setStudentData, studentNumber, formStatus, setFormStatus }}>
            {children}
        </StudentContext.Provider>
    );
};

export { StudentContext, StudentProvider };
