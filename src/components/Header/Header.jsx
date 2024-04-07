import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Paths } from '../../utils/routeConstants';

export default function Header() {
    return (
        <>
            <nav className={styles.nav}>
                <a
                    href="https://builder.io/content/095b0ccbff9142b99d171ecc9ca55f93#"
                    className={styles.a}>
                    <img loading="lazy" alt="" className="img" />
                </a>
                <a className={styles.a-2}>Начало</a>
                <a className={styles.a}><Link to={Paths.ABOUT}>За общежитията</Link></a>
                <a className={styles.a}>Services</a>
                <a className={styles.a}>Контакти</a>
                <a className={styles.a}>Галерия</a>
            </nav>

        </>
    );
}