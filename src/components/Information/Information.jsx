import styles from './Information.module.css'; // Assuming you have CSS module setup


export default function Information() {
    return (
        <>
            <section className={styles.informationSection}>
                <h2>Application Process</h2>
                <p>
                    To apply for a dormitory space, follow these steps:
                </p>
                <ol>
                    <li>Log in to the DormApp portal using your student credentials.</li>
                    <li>Navigate to the 'Apply for Dormitory' section and fill out the application form.</li>
                    <li>Submit your application and wait for the confirmation email.</li>
                    <li>Track your application status via your DormApp account.</li>
                </ol>
            </section>
            <section className={styles.criteriaSection}>
                <h2>Selection Criteria</h2>
                <p>
                    The ranking of applications is based on the following criteria:
                </p>
                <ul>
                    <li>Proximity to campus: Students living further away from campus are given priority.</li>
                    <li>Academic performance: High academic achievers receive additional points.</li>
                    <li>Financial need: Students demonstrating significant financial need are prioritized.</li>
                    <li>Year of study: Priority may be given based on the student's year of study.</li>
                </ul>
            </section>
        </>
    );
}