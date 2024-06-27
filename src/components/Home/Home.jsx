import React from 'react';
import styles from "./Home.module.css";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className={styles.homeContainer}>
            <section className={styles.welcomeSection}>
                <h2>{t('home.aboutSystemTitle')}</h2>
                <p>{t('home.aboutSystemDescription')}</p>
            </section>

            <section className={styles.featureSection}>
                <article>
                    <h3>{t('home.exploreDormitoriesTitle')}</h3>
                    <p>{t('home.exploreDormitoriesDescription')}</p>
                </article>

                <article>
                    <h3>{t('home.simpleApplicationProcessTitle')}</h3>
                    <p>{t('home.simpleApplicationProcessDescription')}</p>
                </article>

                <article>
                    <h3>{t('home.supportTitle')}</h3>
                    <p>{t('home.supportDescription')}</p>
                </article>

                <article>
                    <h3>{t('home.additionalFeatureTitle')}</h3>
                    <p>{t('home.additionalFeatureDescription')}</p>
                </article>
            </section>
        </div>
    );
}
