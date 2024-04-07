import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.dormitoryInfoPage}>
            <section className={styles.dormitory}>
                <h2>Dormitory A</h2>
                <img src='public\logo.png' alt="Dormitory A" />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu metus vitae velit sollicitudin aliquam.</p>
            </section>
            <section className={styles.dormitory}>
                <h2>Dormitory B</h2>
                <img src='public\logo.png'alt="Dormitory B" />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et nisi sed felis facilisis fermentum.</p>
            </section>
        </div>
    );
}