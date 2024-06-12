import React from 'react';
import { Link } from 'react-router-dom'; // Make sure React Router is used for routing
import styles from './AdminDashboard.module.css';
import { Paths } from '../../utils/routeConstants';

export default function AdminDashboard() {
    return (
        <>
            <div className={styles.dashboardContainer}>
                <h2>Admin Dashboard</h2>
                <div className={styles.dashboardLinks}>
                    <Link to={Paths.APPLICATIONS} className={styles.dashboardLink}>Review Applications</Link>
                    <Link to={Paths.RULES} className={styles.dashboardLink}>Modify Classification Rules</Link>
                    <Link to={Paths.ATTRIBUTES} className={styles.dashboardLink}>Modify Attributes</Link>
                </div>
            </div>
        </>
    );
}