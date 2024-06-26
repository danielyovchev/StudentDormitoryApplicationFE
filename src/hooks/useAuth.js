import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../utils/routeConstants';
import { toast } from 'react-toastify';

export const useAuth = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return keycloak && keycloak.authenticated;
    };

    const login = () => {
        keycloak.login().then(() => {
            toast.success('Logged in successfully');
        }).catch(() => {
            toast.error('Failed to log in');
        });
    };

    const logout = () => {
        keycloak.logout({ redirectUri: window.location.origin + Paths.HOME }).then(() => {
            toast.success('Logged out successfully');
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

    // Extract student number from tokenParsed if available
    const studentNumber = keycloak.tokenParsed?.studentNumber || null;

    return {
        isAuthenticated: isAuthenticated(),
        login,
        logout,
        register,
        keycloak,
        initialized,
        isAdmin,
        isStudent,
        studentNumber
    };
};
