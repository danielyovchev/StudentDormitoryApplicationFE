import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Paths } from '../../utils/routeConstants';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
    const { isAuthenticated, login, logout, register } = useAuth();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };

    const handleRegister = (event) => {
        event.preventDefault();
        register();
    };

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.navbarLogo}>
                <img src="/logo.png" alt="logo" className={styles.logoImage} />
            </Link>
            <div className={styles.navbarLinks}>
                <Link to={Paths.OVERVIEW} className={styles.navLink}>Dashboard</Link>
                <Link to={Paths.ADMIN} className={styles.navLink}>Admin Dashboard</Link>
                <Link to={Paths.INFO} className={styles.navLink}>The process</Link>
                <Link to={Paths.ABOUT} className={styles.navLink}>About Us</Link>
                <Link to={Paths.CONTACTS} className={styles.navLink}>Contact</Link>
                {isAuthenticated ? (
                    <a href="/" onClick={handleLogout} className={styles.navLink}>Logout</a>
                ) : (
                    <>
                        <button onClick={login} className={styles.navLinkSpecial}>Login</button>
                        <button onClick={handleRegister} className={styles.navLinkSpecial}>Register</button>
                    </>
                )}
            </div>
        </nav>
    );
}