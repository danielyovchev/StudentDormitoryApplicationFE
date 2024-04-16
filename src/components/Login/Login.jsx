import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import styles from './Login.module.css';

export default function Login() {
	const {initialized ,keycloak } = useKeycloak();

	// Redirect to Keycloak login if not already authenticated
	if (keycloak && !keycloak.authenticated && initialized) {
		keycloak.login();
		return null; // Return nothing while redirecting
	}

	return (
		<div className={styles.loginContainer}>
			{/* This part will only be shown if already logged in (consider a logout button or protected content here) */}
			<h2>You are logged in!</h2>
		</div>
	);
}