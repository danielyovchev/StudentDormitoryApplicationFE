import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    const { initialized, studentNumber, isAuthenticated, isStudent } = useAuth();

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
        preserveRoom: false
    });

    const [formStatus, setFormStatus] = useState({
        studentForm: false,
        familyForm: false
    });

    useEffect(() => {
        if (initialized && studentNumber) {
            setStudentData(prevState => ({
                ...prevState,
                studentNumber
            }));
        } else if (initialized && !studentNumber && isAuthenticated && isStudent) {
            toast.error('Student number not found in Keycloak token.');
        }
    }, [initialized, studentNumber]);

    return (
        <StudentContext.Provider value={{ studentData, setStudentData, studentNumber, formStatus, setFormStatus }}>
            {children}
        </StudentContext.Provider>
    );
};

export { StudentContext, StudentProvider };
