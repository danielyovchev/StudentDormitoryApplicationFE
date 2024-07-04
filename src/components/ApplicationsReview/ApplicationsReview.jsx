import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ApplicationsReview.module.css';
import { API_BASE_URL, Paths } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function ApplicationsReview() {
    const { keycloak } = useAuth();
    const { t } = useTranslation();
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
                <h2>{t('applicationsReview.Applications Pending Review')}</h2>
                {applications.length > 0 ? (
                    <table className={styles.applicationsTable}>
                        <thead>
                            <tr>
                                <th>{t('applicationsReview.Student Number')}</th>
                                <th>{t('applicationsReview.Name')}</th>
                                <th>{t('applicationsReview.Status')}</th>
                                <th>{t('applicationsReview.Application Date')}</th>
                                <th>{t('applicationsReview.Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={index}>
                                    <td>{app.studentId}</td>
                                    <td>{app.studentName}</td>
                                    <td>{app.status}</td>
                                    <td>{app.applicationDate}</td>
                                    <td>
                                        <Link to={`${Paths.DOCUMENTS}?studentNumber=${app.studentId}`} className={styles.actionLink}>{t('applicationsReview.View Details')}</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>{t('applicationsReview.No applications to review')}</p>
                )}
            </div>
        </>
    );
}
