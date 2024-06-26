import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../utils/routeConstants';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const useAuth = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return keycloak && keycloak.authenticated;
    };

    const saveToken = () => {
        if (keycloak.token) {
            sessionStorage.setItem('token', keycloak.token);
        } else {
            console.error('Token is not available to save');
        }
    };

    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            saveToken();
        }
    }, [initialized, keycloak.authenticated]);

    const login = () => {
        keycloak.login()
            .then(() => {
                if (keycloak.token) {
                    saveToken();
                    toast.success('Logged in successfully');
                } else {
                    console.error('Token not available after login'); // Debugging line
                    toast.error('Failed to obtain token after login');
                }
            })
            .catch(() => {
                toast.error('Failed to log in');
            });
    };

    const logout = () => {
        keycloak.logout({ redirectUri: window.location.origin + Paths.HOME })
            .then(() => {
                sessionStorage.removeItem('token');
                toast.success('Logged out successfully');
                navigate(Paths.HOME);
            })
            .catch(() => {
                toast.error('Failed to log out');
            });
    };

    const register = () => {
        keycloak.register()
            .then(() => {
                toast.success('Registered successfully');
            })
            .catch(() => {
                toast.error('Failed to register');
            });
    };

    const isAdmin = keycloak.hasRealmRole('admin');
    const isStudent = keycloak.hasRealmRole('student');

    // Handle token refresh
    if (keycloak && keycloak.token) {
        keycloak.onTokenExpired = () => {
            keycloak.updateToken(30)
                .then(refreshed => {
                    if (refreshed) {
                        saveToken();
                    }
                })
                .catch(() => {
                    console.error('Failed to refresh token');
                });
        };
    }

    return {
        isAuthenticated: isAuthenticated(),
        login,
        logout,
        register,
        keycloak,
        isAdmin,
        isStudent
    };
};
