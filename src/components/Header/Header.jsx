import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Paths } from '../../utils/routeConstants';

export default function Header() {
    const isAuthenticated = false;
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.navbarLogo}><img src="/logo.png" alt='logo' className={styles.logoImage}></img></Link>
            <div className={styles.navbarLinks}>
                <Link to={Paths.OVERVIEW} className={styles.navLink}>Dashboard</Link>
                <Link to={Paths.ADMIN} className={styles.navLink}>Admin Dashboard</Link>
                <Link to={Paths.INFO} className={styles.navLink}>The proccess</Link>
                <Link to={Paths.ABOUT} className={styles.navLink}>About Us</Link>
                <Link to={Paths.CONTACTS} className={styles.navLink}>Contact</Link>
                {isAuthenticated ? (
                    <Link to="/logout" className={styles.navLink}>Logout</Link>
                ) : (
                    <>
                        <Link to={Paths.LOGIN} className={styles.navLinkSpecial}>Login</Link>
                        <Link to={Paths.REGISTER} className={styles.navLinkSpecial}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}