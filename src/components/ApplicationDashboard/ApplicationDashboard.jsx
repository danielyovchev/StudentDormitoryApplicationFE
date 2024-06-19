import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ApplicationDashboard.module.css';
import { API_BASE_URL, Paths } from '../../utils/routeConstants';
import { StudentContext } from '../../contexts/StudentContext';

export default function ApplicationDashboard() {
    const { studentData, formStatus } = useContext(StudentContext);
    const [uploads, setUploads] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showUpload, setShowUpload] = useState(false);

    const categories = {
        deathParent: "Death of Parent",
        raisedInHomes: "Raised in Homes for Children Deprived of Parental Care",
        largeFamilies: "Large Families",
        reducedWorkAbility: "Reduced Ability to Work",
        havingChild: "Having Child",
        foreignStudents: "Foreign Students"
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && studentData.personalID) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('category', selectedCategory);
            formData.append('studentNumber', studentData.personalID);

            try {
                const response = await fetch(`${API_BASE_URL}/upload/student/documents`, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    setUploads(prev => ({ ...prev, [selectedCategory]: file.name }));
                    setShowUpload(false);
                    setSelectedCategory('');
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAddFileClick = () => {
        setShowUpload(true);
    };

    return (
        <>
            <div className={styles.overviewContainer}>
                <h2>Application Forms Overview</h2>
                <ul className={styles.formList}>
                    <li>
                        <strong>Student Application Form: {formStatus.studentForm ? 'Completed' : 'Not Completed'}</strong>
                        {formStatus.studentForm ? (
                            <Link to={Paths.APPLY} className={styles.editLink}>Update Student Data</Link>
                        ) : (
                            <Link to={Paths.APPLY} className={styles.editLink}>Fill Out Form</Link>
                        )}
                    </li>
                    <li>
                        <strong>Family Information Form: {formStatus.familyForm ? 'Completed' : 'Not Completed'}</strong>                      
                        {!formStatus.familyForm && formStatus.studentForm && (
                            <Link to={Paths.FAMILY} className={styles.editLink}>Fill Out Form</Link>
                        )}
                    </li>
                </ul>
                {studentData.personalID && (
                    <div className={styles.documentUploads}>
                        <h3>Upload Required Documents</h3>
                        {Object.entries(uploads).map(([key, value]) => (
                            <p key={key}>{categories[key]}: {value} (submitted)</p>
                        ))}
                        {showUpload && (
                            <div>
                                <select onChange={handleCategoryChange} value={selectedCategory} className={styles.selectCategory}>
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map(key => (
                                        !uploads[key] && <option key={key} value={key}>{categories[key]}</option>
                                    ))}
                                </select>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                        )}
                        {!showUpload && (
                            <button onClick={handleAddFileClick} className={styles.addButton}>Add File</button>
                        )}
                    </div>
                )}
                {(!formStatus.studentForm || !formStatus.familyForm) && (
                    <Link to="/submit-application" className={styles.submitButton}>Review and Submit Application</Link>
                )}
            </div>
        </>
    );
}
