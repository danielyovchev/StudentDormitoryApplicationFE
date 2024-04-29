import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you have React Router set up
import styles from './ApplicationDashboard.module.css';
import { Paths } from '../../utils/routeConstants';

export default function ApplicationDashboard() {
    const [formStatus, setFormStatus] = useState({
        studentForm: false,
        familyForm: false
    });
    // Implement with BE
    // useEffect(() => {
    //     // Imagine this data comes from local storage or a backend API
    //     const savedStatus = {
    //         studentForm: true,
    //         familyForm: false
    //     };
    //     setFormStatus(savedStatus);
    // }, []);
    return (
        <>
            <div className={styles.overviewContainer}>
                <h2>Application Forms Overview</h2>
                <ul className={styles.formList}>
                    <li>
                        <strong>Student Application Form:</strong>
                        {formStatus.studentForm ? ' Completed' : ' Not Completed'}
                        {!formStatus.studentForm && (
                            <Link to={Paths.APPLY} className={styles.editLink}>Fill Out Form</Link>
                        )}                       
                    </li>
                    <li>
                        <strong>Family Information Form:</strong>
                        {formStatus.familyForm ? ' Completed' : ' Not Completed'}
                        {!formStatus.familyForm && (
                            <Link to={Paths.FAMILY} className={styles.editLink}>Fill Out Form</Link>
                        )}
                    </li>
                </ul>
                {(!formStatus.studentForm || !formStatus.familyForm) && (
                    <Link to="/submit-application" className={styles.submitButton}>Review and Submit Application</Link>
                )}
            </div>
        </>
    );
}