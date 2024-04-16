import styles from './Contacts.module.css'; // Assuming you have CSS module setup


export default function Contacts() {
    return (
        <>
            <section className={styles.contactSection}>
                <h2>Contact Persons for Application</h2>
                <div className={styles.person}>
                    <h3>Jane Doe</h3>
                    <p>Email: jane.doe@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className={styles.person}>
                    <h3>John Smith</h3>
                    <p>Email: john.smith@example.com</p>
                    <p>Phone: (098) 765-4321</p>
                </div>
            </section>

            <section className={styles.dormSection}>
                <h2>Dormitory Locations</h2>
                <div className={styles.dormitory}>
                    <h3>Dormitory A</h3>
                    <p>Location: 123 College St, City Name, State</p>
                    <p>Phone: (321) 654-9870</p>
                </div>
                <div className={styles.dormitory}>
                    <h3>Dormitory B</h3>
                    <p>Location: 456 University Ave, City Name, State</p>
                    <p>Phone: (654) 321-8765</p>
                </div>
            </section>
        </>
    );
}