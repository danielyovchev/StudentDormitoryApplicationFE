import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import styles from './ApplicationsReview.module.css';
import { API_BASE_URL, Paths } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';

export default function ApplicationsReview() {
    const { keycloak } = useAuth();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/review/students`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setApplications(data.applications);
                } else {
                    console.error('Failed to fetch applications');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        if (keycloak.token) {
            fetchApplications();
        }
    }, [keycloak.token]);

    return (
        <>
            <div className={styles.reviewContainer}>
                <h2>Applications Pending Review</h2>
                {applications.length > 0 ? (
                    <table className={styles.applicationsTable}>
                        <thead>
                            <tr>
                                <th>Student Number</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Application Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={index}>
                                    <td>{app.studentId}</td> {/* Display studentId */}
                                    <td>{app.studentName}</td>
                                    <td>{app.status}</td>
                                    <td>{app.applicationDate}</td>
                                    <td>
                                        <Link to={`${Paths.DOCUMENTS}?studentNumber=${app.studentId}`} className={styles.actionLink}>View Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No applications to review.</p>
                )}
            </div>
        </>
    );
}
