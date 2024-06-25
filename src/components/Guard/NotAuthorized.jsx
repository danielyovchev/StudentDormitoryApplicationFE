import { Paths } from "../../utils/routeConstants";
import { useNavigate } from 'react-router-dom';
import styles from './NotAuthorized.module.css';

export default function NotAuthorized () {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate(Paths.HOME);
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.head}>Not Authorized</h2>
            <p className={styles.text}>You do not have permission to view this page.</p>
            <button onClick={goToHomePage} className={styles.homeButton}>Go to Home Page</button>
        </div>
    );
}