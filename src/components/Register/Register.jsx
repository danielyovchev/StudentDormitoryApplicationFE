import { useState } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Register.module.css';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentNumber, setStudentNumber] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        // Implement your registration logic here, typically involving an API call
        console.log('Registration Details:', fullName, email, password, studentNumber);
    };
    return (
        <>
            <Header />
            <div className={styles.registerContainer}>
                <form className={styles.registerForm} onSubmit={handleRegister}>
                    <h2>Create Your Account</h2>
                    <div className={styles.inputGroup}>
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="studentNumber">Student Number:</label>
                        <input
                            type="text"
                            id="studentNumber"
                            name="studentNumber"
                            value={studentNumber}
                            onChange={(e) => setStudentNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.registerButton}>Register</button>
                </form>
            </div>
            <Footer />
        </>
    );
}