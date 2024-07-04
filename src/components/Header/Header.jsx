import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Paths } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import bgFlag from '../../assets/flags/bg.svg';
import enFlag from '../../assets/flags/en.svg';

export default function Header() {
    const { isAuthenticated, login, logout, register, isAdmin, isStudent } = useAuth();
    const { t, i18n } = useTranslation();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };

    const handleRegister = (event) => {
        event.preventDefault();
        register();
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'bg' ? 'en' : 'bg';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.navbarLogo}>
                <img src="/logo.png" alt="logo" className={styles.logoImage} />
            </Link>
            <div className={styles.navbarLinks}>
                {isStudent && (
                    <Link to={Paths.OVERVIEW} className={styles.navLink}>{t('Dashboard')}</Link>
                )}
                {isAdmin && (
                    <Link to={Paths.ADMIN} className={styles.navLink}>{t('Admin Dashboard')}</Link>
                )}
                <Link to={Paths.INFO} className={styles.navLink}>{t('The process')}</Link>
                <Link to={Paths.ABOUT} className={styles.navLink}>{t('About Us')}</Link>
                <Link to={Paths.CONTACTS} className={styles.navLink}>{t('Contact')}</Link>
                {isAuthenticated ? (
                    <a href="/" onClick={handleLogout} className={styles.navLink}>{t('Logout')}</a>
                ) : (
                    <>
                        <button onClick={login} className={styles.navLinkSpecial}>{t('Login')}</button>
                        <button onClick={handleRegister} className={styles.navLinkSpecial}>{t('Register')}</button>
                    </>
                )}
                <button onClick={toggleLanguage} className={styles.navLinkSpecial}>
                    <img
                        src={i18n.language === 'bg' ? enFlag : bgFlag}
                        alt={i18n.language === 'bg' ? 'English' : 'Bulgarian'}
                        className={styles.flagImage}
                    />
                </button>
            </div>
        </nav>
    );
}
