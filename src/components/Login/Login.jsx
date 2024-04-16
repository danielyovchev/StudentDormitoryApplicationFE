import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (event) => {
		event.preventDefault();

		console.log('Login Attempt:', username, password);
	};
	return (
		<>
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
		</>
	);
}