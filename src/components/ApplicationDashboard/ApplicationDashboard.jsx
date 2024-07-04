import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ApplicationDashboard.module.css';
import { API_BASE_URL, Paths } from '../../utils/routeConstants';
import { StudentContext } from '../../contexts/StudentContext';
import { useAuth } from '../../hooks/useAuth';
import RankingInfo from '../RankingInfo/RankingInfo';
import { useTranslation } from 'react-i18next';

export default function ApplicationDashboard() {
    const { studentData, formStatus, setFormStatus, studentNumber } = useContext(StudentContext);
    const { keycloak } = useAuth();
    const { t } = useTranslation();
    const [applicationData, setApplicationData] = useState(null);
    const [uploads, setUploads] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [rankingData, setRankingData] = useState(null);

    useEffect(() => {
        if (studentNumber && keycloak.token) {
            fetchStudentData();
            fetchStudentDocuments();
        }
    }, [studentNumber, keycloak.token]);

    const fetchStudentData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/data`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setFormStatus(prevStatus => ({ ...prevStatus, studentForm: true }));
                }
            } else {
                console.error('Failed to fetch student data');
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const checkExistingApplication = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/apply/get/${studentNumber}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.applicationDTO) {
                    setApplicationData(data.applicationDTO);
                    if (data.applicationDTO.status === "SUCCESSFUL" || data.applicationDTO.status === "PENDING") {
                        setRankingData(data.applicationDTO);
                    }
                }
            } else {
                console.error('Failed to fetch application data');
            }
        } catch (error) {
            console.error('Error fetching application data:', error);
        }
    };

    const fetchStudentDocuments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get/student/${studentNumber}/documents`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data.documents)) {
                    setDocuments(data.documents);
                } else {
                    console.error('Fetched data does not contain documents array:', data);
                }
            } else {
                console.error('Failed to fetch student documents');
            }
        } catch (error) {
            console.error('Error fetching student documents:', error);
        }
    };

    const handleSubmitApplication = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${keycloak.token}`
                },
                body: JSON.stringify({ studentNumber })
            });

            if (response.ok) {
                checkExistingApplication();
            } else {
                console.error('Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    const categories = {
        PARENTDEATH: t('applicationDashboard.Death of Parent'),
        HOMELESS: t('applicationDashboard.Raised in Homes for Children Deprived of Parental Care'),
        LARGEFAMILY: t('applicationDashboard.Large Families'),
        REDUCEDABILITY: t('applicationDashboard.Reduced Ability to Work'),
        CHILD: t('applicationDashboard.Having Child'),
        FOREIGN: t('applicationDashboard.Foreign Students')
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && studentNumber && keycloak.token) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('documentType', selectedCategory);
            formData.append('studentNumber', studentNumber);

            try {
                const response = await fetch(`${API_BASE_URL}/upload/student/documents`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    setUploads(prev => ({ ...prev, [selectedCategory]: file.name }));
                    setShowUpload(false);
                    setSelectedCategory('');
                    fetchStudentDocuments();
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('Missing required information for file upload');
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAddFileClick = () => {
        setShowUpload(true);
    };

    if (rankingData) {
        return <RankingInfo rankingData={rankingData} />;
    }

    return (
        <>
            <div className={styles.overviewContainer}>
                <h2>{t('applicationDashboard.Application Forms Overview')}</h2>
                <ul className={styles.formList}>
                    <li>
                        <strong>{t('applicationDashboard.Student Application Form')}: {formStatus.studentForm ? t('applicationDashboard.Completed') : t('applicationDashboard.Not Completed')}</strong>
                        {formStatus.studentForm ? (
                            <Link to={Paths.APPLY} className={styles.editLink}>{t('applicationDashboard.Update Student Data')}</Link>
                        ) : (
                            <Link to={Paths.APPLY} className={styles.editLink}>{t('applicationDashboard.Fill Out Form')}</Link>
                        )}
                    </li>
                    <li>
                        <strong>{t('applicationDashboard.Family Information Form')}: {formStatus.familyForm ? t('applicationDashboard.Completed') : t('applicationDashboard.Not Completed')}</strong>
                        {!formStatus.familyForm && formStatus.studentForm && (
                            <Link to={Paths.FAMILY} className={styles.editLink}>{t('applicationDashboard.Fill Out Form')}</Link>
                        )}
                    </li>
                </ul>
                {studentNumber && formStatus.studentForm && (
                    <div className={styles.documentUploads}>
                        <h3>{t('applicationDashboard.Upload Required Documents')}</h3>
                        {Object.entries(uploads).map(([key, value]) => (
                            <p key={key}>{categories[key]}: {value} {t('applicationDashboard.(submitted)')}</p>
                        ))}
                        {showUpload && (
                            <div>
                                <select onChange={handleCategoryChange} value={selectedCategory} className={styles.selectCategory}>
                                    <option value="">{t('applicationDashboard.Select Category')}</option>
                                    {Object.keys(categories).map(key => (
                                        !uploads[key] && <option key={key} value={key}>{categories[key]}</option>
                                    ))}
                                </select>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                        )}
                        {!showUpload && (
                            <button onClick={handleAddFileClick} className={styles.addButton}>{t('applicationDashboard.Add File')}</button>
                        )}
                    </div>
                )}
                <h3>{t('applicationDashboard.Uploaded Documents')}</h3>
                <ul className={styles.documentList}>
                    {documents.map(document => (
                        <li key={document.fileUrl}>
                            <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">{document.fileName || t('applicationDashboard.No Name Provided')}</a> - {document.documentType || t('applicationDashboard.No Type Provided')}
                        </li>
                    ))}
                </ul>
                {(!formStatus.studentForm || !formStatus.familyForm) && (
                    <button onClick={handleSubmitApplication} className={styles.submitButton}>{t('applicationDashboard.Review and Submit Application')}</button>
                )}
            </div>
        </>
    );
}
