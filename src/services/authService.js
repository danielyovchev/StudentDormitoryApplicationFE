import keycloak from "../config/keycloakConfig";

const initKeycloak = async () => {
    try {
        // Initialize Keycloak with 'login-required' to ensure the login screen is shown if not authenticated
        const authStatus = await keycloak.init({ onLoad: 'login-required' });
        return authStatus; // Return the authentication status
    } catch (error) {
        console.error("Error initializing Keycloak:", error);
        throw new Error("Keycloak initialization failed");
    }
}

// Login Function
export const login = async () => {
    try {
        const isAuthenticated = await initKeycloak(); // Ensure Keycloak is initialized
        if (isAuthenticated) {
            return keycloak; // Return the Keycloak instance if authenticated
        } else {
            throw new Error("User not authenticated");
        }
    } catch (error) {
        console.error("Authentication Error:", error);
        throw new Error("Login process failed");
    }
}

// Logout Function
export const logout = () => {
    try {
        keycloak.logout(); // Use Keycloak's logout method to end the session
    } catch (error) {
        console.error("Logout Error:", error);
        throw new Error("Logout failed");
    }
}