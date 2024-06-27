import styles from './Contacts.module.css';
import { useTranslation } from 'react-i18next';

export default function Contacts() {
    const { t } = useTranslation();

    return (
        <div className={styles.contactsContainer}>
            <section className={styles.contactSection}>
                <h2>{t('contacts.contactPersonsTitle')}</h2>
                <div className={styles.person}>
                    <h3>{t('contacts.person1.name')}</h3>
                    <p>{t('contacts.email')}: {t('contacts.person1.email')}</p>
                    <p>{t('contacts.phone')}: {t('contacts.person1.phone')}</p>
                </div>
                <div className={styles.person}>
                    <h3>{t('contacts.person2.name')}</h3>
                    <p>{t('contacts.email')}: {t('contacts.person2.email')}</p>
                    <p>{t('contacts.phone')}: {t('contacts.person2.phone')}</p>
                </div>
            </section>

            <section className={styles.dormSection}>
                <h2>{t('contacts.dormitoryLocationsTitle')}</h2>
                <div className={styles.dormitory}>
                    <h3>{t('contacts.dormitory1.name')}</h3>
                    <p>{t('contacts.location')}: {t('contacts.dormitory1.location')}</p>
                    <p>{t('contacts.phone')}: {t('contacts.dormitory1.phone')}</p>
                </div>
                <div className={styles.dormitory}>
                    <h3>{t('contacts.dormitory2.name')}</h3>
                    <p>{t('contacts.location')}: {t('contacts.dormitory2.location')}</p>
                    <p>{t('contacts.phone')}: {t('contacts.dormitory2.phone')}</p>
                </div>
            </section>
        </div>
    );
}