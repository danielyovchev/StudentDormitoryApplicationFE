import React, { createContext, useState } from 'react';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
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
        studentNumber: '',
        phoneNumber: '',
        grade: '',
        yearOfStudy: 'first',
        preserveRoom: false // Checkbox for preserving room
    });

    const [studentNumber, setStudentNumber] = useState('');
    const [formStatus, setFormStatus] = useState({
        studentForm: false,
        familyForm: false
    });

    return (
        <StudentContext.Provider value={{ studentData, setStudentData, studentNumber, setStudentNumber, formStatus, setFormStatus }}>
            {children}
        </StudentContext.Provider>
    );
};

export { StudentContext, StudentProvider };
