import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Apply.module.css';
import { StudentContext } from '../../contexts/StudentContext';
import { API_BASE_URL, Paths } from '../../utils/routeConstants';

export default function Apply() {
    const { studentData, setStudentData, setFormStatus, studentNumber } = useContext(StudentContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    console.error('User is not authenticated');
                    return;
                }
                const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/data`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setStudentData(prevData => ({
                            ...prevData,
                            ...data
                        }));
                    }
                } else {
                    console.error('Failed to fetch student data');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        if (studentNumber) {
            fetchStudentData();
        }
    }, [studentNumber, setStudentData]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setStudentData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!studentData.yearOfStudy) newErrors.yearOfStudy = 'Year of Study is required';
        if (!studentData.educationForm) newErrors.educationForm = 'Form of Education is required';
        if (!studentData.faculty) newErrors.faculty = 'Faculty is required';
        if (!studentData.specialty) newErrors.specialty = 'Specialty is required';
        if (!studentData.city) newErrors.city = 'City is required';
        if (!studentData.municipality) newErrors.municipality = 'Municipality is required';
        if (!studentData.address) newErrors.address = 'Address is required';
        if (!studentData.personalID) newErrors.personalID = 'Personal Identification Number is required';
        if (!studentNumber) newErrors.studentNumber = 'Student Number is required';
        if (!studentData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!studentData.grade && studentData.grade !== 0) newErrors.grade = 'Grade is required';
        if (!studentData.buildingNumber) newErrors.buildingNumber = 'Building Number is required';
        if (!studentData.sex) newErrors.sex = 'Sex is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const payload = {
            name: `${studentData.givenName} ${studentData.familyName}`,
            educationForm: studentData.educationForm.toUpperCase(),
            faculty: studentData.faculty.toUpperCase(),
            specialty: studentData.specialty.toUpperCase(),
            city: studentData.city,
            municipality: studentData.municipality,
            address: studentData.address,
            personalId: studentData.personalID,
            phoneNumber: studentData.phoneNumber,
            grade: parseFloat(studentData.grade),
            dormitoryNumber: parseInt(studentData.buildingNumber, 10),
            roomNumber: parseInt(studentData.roomNumber, 10),
            sex: studentData.sex,
            studentNumber: studentNumber,
            examsToRetake: parseInt(studentData.examsToRetake, 10)
        };

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('User is not authenticated');
                return;
            }
            const response = await fetch(`${API_BASE_URL}/upload/student/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json();
            if (response.ok) {
                setFormStatus(prevStatus => ({ ...prevStatus, studentForm: true }));
                toast.success(responseData.message || 'Application submitted successfully!');
                navigate(Paths.OVERVIEW);
            } else {
                toast.error(responseData.message || 'Student data submission failed');
            }
        } catch (error) {
            console.error('Error submitting student data:', error);
            toast.error('Error submitting student data');
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.applicationForm}>
                <h2>Student Application Form</h2>
                <label>
                    Year of Study:
                    <select name="yearOfStudy" value={studentData.yearOfStudy || ''} onChange={handleChange}>
                        <option value="first">First Year</option>
                        <option value="second">Second Year and Above</option>
                    </select>
                    {errors.yearOfStudy && <span className={styles.error}>{errors.yearOfStudy}</span>}
                </label>
                {studentData.yearOfStudy !== 'first' && (
                    <>
                        <label>
                            Preserve room from last year:
                            <input
                                type="checkbox"
                                name="preserveRoom"
                                checked={studentData.preserveRoom || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Number of exams to retake:
                            <input
                                type="number"
                                name="examsToRetake"
                                value={studentData.examsToRetake || ''}
                                onChange={handleChange}
                                min="0"
                            />
                        </label>
                    </>
                )}
                <label>
                    Form of Education:
                    <select name="educationForm" value={studentData.educationForm || ''} onChange={handleChange}>
                        <option value="REGULAR">Regular</option>
                        <option value="SHORTENED">Shortened</option>
                    </select>
                    {errors.educationForm && <span className={styles.error}>{errors.educationForm}</span>}
                </label>
                <label>
                    Faculty:
                    <select name="faculty" value={studentData.faculty || ''} onChange={handleChange}>
                        <option value="FITA">FITA</option>
                        <option value="SHIPMENT">Shipment</option>
                        <option value="ELECTRICAL">Electrical</option>
                        <option value="SS">SS</option>
                    </select>
                    {errors.faculty && <span className={styles.error}>{errors.faculty}</span>}
                </label>
                <label>
                    Specialty:
                    <select name="specialty" value={studentData.specialty || ''} onChange={handleChange}>
                        <option value="SIT">SIT</option>
                        <option value="KST">KST</option>
                        <option value="SS">SS</option>
                    </select>
                    {errors.specialty && <span className={styles.error}>{errors.specialty}</span>}
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={studentData.city || ''} onChange={handleChange} />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                </label>
                <label>
                    Municipality:
                    <input type="text" name="municipality" value={studentData.municipality || ''} onChange={handleChange} />
                    {errors.municipality && <span className={styles.error}>{errors.municipality}</span>}
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={studentData.address || ''} onChange={handleChange} />
                    {errors.address && <span className={styles.error}>{errors.address}</span>}
                </label>
                <label>
                    Building Number:
                    <select name="buildingNumber" value={studentData.buildingNumber || ''} onChange={handleChange}>
                        <option value="18">18</option>
                        <option value="13">13</option>
                    </select>
                    {errors.buildingNumber && <span className={styles.error}>{errors.buildingNumber}</span>}
                </label>
                <label>
                    Room Number:
                    <input type="number" name="roomNumber" value={studentData.roomNumber || ''} onChange={handleChange} min="0" />
                </label>
                <label>
                    Personal Identification Number:
                    <input type="text" name="personalID" value={studentData.personalID || ''} onChange={handleChange} />
                    {errors.personalID && <span className={styles.error}>{errors.personalID}</span>}
                </label>
                <label>
                    Phone Number:
                    <input type="text" name="phoneNumber" value={studentData.phoneNumber || ''} onChange={handleChange} />
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
                </label>
                <label>
                    {studentData.yearOfStudy === 'first' ? "Grade from School:" : "Grade from Last Year:"}
                    <input type="number" name="grade" value={studentData.grade || ''} onChange={handleChange} step="0.01" min="0" />
                    {errors.grade && <span className={styles.error}>{errors.grade}</span>}
                </label>
                <label>
                    Sex:
                    <select name="sex" value={studentData.sex || ''} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.sex && <span className={styles.error}>{errors.sex}</span>}
                </label>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}
