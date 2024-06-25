import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../utils/routeConstants';

export const useAuth = () => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return keycloak && keycloak.authenticated;
    };

    const login = () => {
        keycloak.login();
    };

    const logout = () => {
        keycloak.logout();
    };

    const register = () => {
        keycloak.register();
    };

    const isAdmin = keycloak.hasRealmRole('admin');
    const isStudent = keycloak.hasRealmRole('student');

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
