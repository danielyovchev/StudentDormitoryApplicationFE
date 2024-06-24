import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import styles from './ApplicationsReview.module.css';
import { Paths } from '../../utils/routeConstants';


export default function ApplicationsReview() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Simulate fetching data from a server
        const fetchApplications = async () => {
            // Replace this with actual API call
            const fetchedApplications = [
                { id: 1, studentName: "John Doe", status: "Pending", applicationDate: "2024-04-12" },
                { id: 2, studentName: "Jane Smith", status: "Pending", applicationDate: "2024-04-11" }
            ];
            setApplications(fetchedApplications);
        };

        fetchApplications();
    }, []);

    return (
        <>
            <div className={styles.reviewContainer}>
                <h2>Applications Pending Review</h2>
                {applications.length > 0 ? (
                    <table className={styles.applicationsTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Application Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.studentName}</td>
                                    <td>{app.status}</td>
                                    <td>{app.applicationDate}</td>
                                    <td>
                                        <Link to={Paths.DOCUMENTS} className={styles.actionLink}>View Details</Link>
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