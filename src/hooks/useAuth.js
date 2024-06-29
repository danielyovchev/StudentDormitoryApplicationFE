import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Paths } from '../utils/routeConstants';

export const useAuth = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    const saveTokenToSession = useCallback(() => {
        sessionStorage.setItem('token', keycloak.token);
        sessionStorage.setItem('tokenParsed', JSON.stringify(keycloak.tokenParsed));
    }, [keycloak]);

    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            console.log('Saving token to session storage');
            saveTokenToSession();

            // Set interval to check token expiry and refresh if needed
            const refreshInterval = setInterval(() => {
                if (keycloak.tokenParsed && keycloak.tokenParsed.exp) {
                    const expiresIn = keycloak.tokenParsed.exp * 1000 - new Date().getTime();
                    if (expiresIn <= 60000) { // Less than 1 minute
                        keycloak.updateToken(60).then(refreshed => {
                            if (refreshed) {
                                console.log('Token was successfully refreshed');
                                saveTokenToSession();
                            } else {
                                console.warn('Token is still valid');
                            }
                        }).catch(err => {
                            console.error('Failed to refresh token', err);
                            toast.error('Failed to refresh token, please login again');
                            logout();
                        });
                    }
                }
            }, 10000); // Check every 10 seconds

            return () => clearInterval(refreshInterval);
        }
    }, [initialized, keycloak, saveTokenToSession]);

    const isAuthenticated = () => {
        return keycloak && keycloak.authenticated;
    };

    const login = () => {
        keycloak.login().then(() => {
            toast.success('Logged in successfully');
            saveTokenToSession();
        }).catch(() => {
            toast.error('Failed to log in');
        });
    };

    const logout = () => {
        keycloak.logout({ redirectUri: window.location.origin + Paths.HOME }).then(() => {
            toast.success('Logged out successfully');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tokenParsed');
            navigate(Paths.HOME);
        }).catch(() => {
            toast.error('Failed to log out');
        });
    };

    const register = () => {
        keycloak.register().then(() => {
            toast.success('Registered successfully');
        }).catch(() => {
            toast.error('Failed to register');
        });
    };

    const isAdmin = keycloak?.hasRealmRole('admin');
    const isStudent = keycloak?.hasRealmRole('student');

    const tokenParsed = keycloak.tokenParsed || JSON.parse(sessionStorage.getItem('tokenParsed'));
    const studentNumber = tokenParsed?.studentNumber || null;
    const givenName = keycloak.tokenParsed?.given_name || null;
    const familyName = keycloak.tokenParsed?.family_name || null;

    return {
        isAuthenticated: isAuthenticated(),
        login,
        logout,
        register,
        keycloak,
        initialized,
        isAdmin,
        isStudent,
        studentNumber,
        givenName,
        familyName
    };
};
