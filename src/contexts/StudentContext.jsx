import React, { createContext, useState } from 'react';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
    const [studentData, setStudentData] = useState({
        educationForm: 'regular',
        faculty: '',
        specialty: '',
        city: '',
        municipality: '',
        street: '',
        streetNumber: '',
        buildingNumber: '18', // Default to building 18
        roomNumber: '',
        entrance: '',
        apartment: '',
        personalID: '',
        phoneNumber: '',
        grade: '',
        yearOfStudy: 'first', // Default to first year
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
