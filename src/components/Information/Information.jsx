import React from 'react';
import styles from './Information.module.css';
import { useTranslation } from 'react-i18next';

export default function Information() {
    const { t } = useTranslation();

    return (
        <div className={styles.informationContainer}>
            <section className={styles.informationSection}>
                <h2>{t('information.applicationProcessTitle')}</h2>
                <p>{t('information.applicationProcessDescription')}</p>
                <ol>
                    <li>{t('information.step1')}</li>
                    <li>{t('information.step2')}</li>
                    <li>{t('information.step3')}</li>
                    <li>{t('information.step4')}</li>
                </ol>
            </section>
            <section className={styles.criteriaSection}>
                <h2>{t('information.selectionCriteriaTitle')}</h2>
                <p>{t('information.guaranteeDescription')}</p>
                <ul>
                    <li>{t('information.guarantee1')}</li>
                    <li>{t('information.guarantee2')}</li>
                    <li>{t('information.guarantee3')}</li>
                    <li>{t('information.guarantee4')}</li>
                    <li>{t('information.guarantee5')}</li>
                    <li>{t('information.guarantee6')}</li>
                </ul>
                <p>{t('information.otherRankingCriteria')}</p>
            </section>
        </div>
    );
}
