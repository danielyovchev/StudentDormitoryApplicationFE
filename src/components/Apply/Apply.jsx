import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Apply.module.css';
import { StudentContext } from '../../contexts/StudentContext';
import { API_BASE_URL, Paths } from '../../utils/routeConstants';
import { useTranslation } from 'react-i18next';

export default function Apply() {
    const { studentData, setStudentData, setFormStatus, studentNumber } = useContext(StudentContext);
    const [errors, setErrors] = useState({});
    const [rooms, setRooms] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchRoomsData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/rooms`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    setRooms(data.rooms);
                } else {
                    console.error('Failed to fetch rooms data');
                }
            } catch (error) {
                console.error('Error fetching rooms data:', error);
            }
        };

        fetchRoomsData();
    }, []);

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
        if (!studentData.yearOfStudy) newErrors.yearOfStudy = t('apply.yearOfStudyRequired');
        if (!studentData.educationForm) newErrors.educationForm = t('apply.educationFormRequired');
        if (!studentData.faculty) newErrors.faculty = t('apply.facultyRequired');
        if (!studentData.specialty) newErrors.specialty = t('apply.specialtyRequired');
        if (!studentData.city) newErrors.city = t('apply.cityRequired');
        if (!studentData.municipality) newErrors.municipality = t('apply.municipalityRequired');
        if (!studentData.address) newErrors.address = t('apply.addressRequired');
        if (!studentData.personalID) newErrors.personalID = t('apply.personalIDRequired');
        if (!studentNumber) newErrors.studentNumber = t('apply.studentNumberRequired');
        if (!studentData.phoneNumber) newErrors.phoneNumber = t('apply.phoneNumberRequired');
        if (!studentData.grade && studentData.grade !== 0) newErrors.grade = t('apply.gradeRequired');
        if (!studentData.buildingNumber) newErrors.buildingNumber = t('apply.buildingNumberRequired');
        if (!studentData.sex) newErrors.sex = t('apply.sexRequired');

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
                toast.success(responseData.message || t('apply.applicationSubmittedSuccessfully'));
                navigate(Paths.OVERVIEW);
            } else {
                toast.error(responseData.message || t('apply.studentDataSubmissionFailed'));
            }
        } catch (error) {
            console.error(t('apply.errorSubmittingStudentData'), error);
            toast.error(t('apply.errorSubmittingStudentData'));
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.applicationForm}>
                <h2>{t('apply.studentApplicationForm')}</h2>
                <label>
                    {t('apply.yearOfStudy')}:
                    <select name="yearOfStudy" value={studentData.yearOfStudy || ''} onChange={handleChange}>
                        <option value="first">{t('apply.firstYear')}</option>
                        <option value="second">{t('apply.secondYearAndAbove')}</option>
                    </select>
                    {errors.yearOfStudy && <span className={styles.error}>{errors.yearOfStudy}</span>}
                </label>
                {studentData.yearOfStudy !== 'first' && (
                    <>
                        <label>
                            {t('apply.preserveRoom')}:
                            <input
                                type="checkbox"
                                name="preserveRoom"
                                checked={studentData.preserveRoom || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            {t('apply.numberOfExamsToRetake')}:
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
                    {t('apply.formOfEducation')}:
                    <select name="educationForm" value={studentData.educationForm || ''} onChange={handleChange}>
                        <option value="REGULAR">{t('apply.regular')}</option>
                        <option value="SHORTENED">{t('apply.shortened')}</option>
                    </select>
                    {errors.educationForm && <span className={styles.error}>{errors.educationForm}</span>}
                </label>
                <label>
                    {t('apply.faculty')}:
                    <select name="faculty" value={studentData.faculty || ''} onChange={handleChange}>
                        <option value="FITA">{t('apply.fita')}</option>
                        <option value="SHIPMENT">{t('apply.shipment')}</option>
                        <option value="ELECTRICAL">{t('apply.electrical')}</option>
                        <option value="SS">{t('apply.ss')}</option>
                    </select>
                    {errors.faculty && <span className={styles.error}>{errors.faculty}</span>}
                </label>
                <label>
                    {t('apply.specialty')}:
                    <select name="specialty" value={studentData.specialty || ''} onChange={handleChange}>
                        <option value="SIT">{t('apply.sit')}</option>
                        <option value="KST">{t('apply.kst')}</option>
                        <option value="SS">{t('apply.ss')}</option>
                    </select>
                    {errors.specialty && <span className={styles.error}>{errors.specialty}</span>}
                </label>
                <label>
                    {t('apply.city')}:
                    <input type="text" name="city" value={studentData.city || ''} onChange={handleChange} />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                </label>
                <label>
                    {t('apply.municipality')}:
                    <input type="text" name="municipality" value={studentData.municipality || ''} onChange={handleChange} />
                    {errors.municipality && <span className={styles.error}>{errors.municipality}</span>}
                </label>
                <label>
                    {t('apply.address')}:
                    <input type="text" name="address" value={studentData.address || ''} onChange={handleChange} />
                    {errors.address && <span className={styles.error}>{errors.address}</span>}
                </label>
                <label>
                    {t('apply.buildingNumber')}:
                    <select name="buildingNumber" value={studentData.buildingNumber || ''} onChange={handleChange}>
                        {Object.keys(rooms).map(dormitoryId => (
                            <option key={dormitoryId} value={dormitoryId}>
                                {dormitoryId}
                            </option>
                        ))}
                    </select>
                    {errors.buildingNumber && <span className={styles.error}>{errors.buildingNumber}</span>}
                </label>
                <label>
                    {t('apply.roomNumber')}:
                    <select name="roomNumber" value={studentData.roomNumber || ''} onChange={handleChange}>
                        {(rooms[studentData.buildingNumber] || []).map(roomNumber => (
                            <option key={roomNumber} value={roomNumber}>
                                {roomNumber}
                            </option>
                        ))}
                    </select>
                    {errors.roomNumber && <span className={styles.error}>{errors.roomNumber}</span>}
                </label>
                <label>
                    {t('apply.personalID')}:
                    <input type="text" name="personalID" value={studentData.personalID || ''} onChange={handleChange} />
                    {errors.personalID && <span className={styles.error}>{errors.personalID}</span>}
                </label>
                <label>
                    {t('apply.phoneNumber')}:
                    <input type="text" name="phoneNumber" value={studentData.phoneNumber || ''} onChange={handleChange} />
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
                </label>
                <label>
                    {studentData.yearOfStudy === 'first' ? t('apply.gradeFromSchool') : t('apply.gradeFromLastYear')}:
                    <input type="number" name="grade" value={studentData.grade || ''} onChange={handleChange} step="0.01" min="0" />
                    {errors.grade && <span className={styles.error}>{errors.grade}</span>}
                </label>
                <label>
                    {t('apply.sex')}:
                    <select name="sex" value={studentData.sex || ''} onChange={handleChange}>
                        <option value="">{t('apply.select')}</option>
                        <option value="Male">{t('apply.male')}</option>
                        <option value="Female">{t('apply.female')}</option>
                        <option value="Other">{t('apply.other')}</option>
                    </select>
                    {errors.sex && <span className={styles.error}>{errors.sex}</span>}
                </label>
                <button type="submit">{t('apply.submitApplication')}</button>
            </form>
        </div>
    );
}
