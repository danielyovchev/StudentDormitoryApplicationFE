import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Welcome to the Dormitory Application System</h1>
            <nav className="navbar">
                <a href="/dorms">View Dormitories</a>
                <a href="/apply">Apply for a Room</a>
                <a href="/contact">Contact Administration</a>
            </nav>
        </header>);
}