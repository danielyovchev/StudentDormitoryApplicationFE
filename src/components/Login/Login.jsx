import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Login.module.css'; // Assuming you have CSS module setup

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Implement your login logic here, typically involving an API call
        console.log('Login Attempt:', username, password);
    };
    return (
        <>
        <Header />
        <div className={styles.loginContainer}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <h2>Login to Your Account</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit" className={styles.loginButton}>Log In</button>
          </form>
        </div>
        <Footer />
      </>
    );
}