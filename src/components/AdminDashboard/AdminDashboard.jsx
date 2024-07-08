import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import { Paths } from '../../utils/routeConstants';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.dashboardContainer}>
                <h2>{t('adminDashboard.adminDashboard')}</h2>
                <div className={styles.dashboardLinks}>
                    <Link to={Paths.APPLICATIONS} className={styles.dashboardLink}>{t('adminDashboard.reviewApplications')}</Link>
                    <Link to={Paths.RULES} className={styles.dashboardLink}>{t('adminDashboard.modifyClassificationRules')}</Link>
                    <Link to={Paths.ATTRIBUTES} className={styles.dashboardLink}>{t('adminDashboard.modifyAttributes')}</Link>
                    <Link to={Paths.RANKING} className={styles.dashboardLink}>{t('adminDashboard.studentRanking')}</Link>
                </div>
            </div>
        </>
    );
}
