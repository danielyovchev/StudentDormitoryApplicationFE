import { useKeycloak } from '@react-keycloak/web';

export const useAuth = () => {
    const { keycloak } = useKeycloak();

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

    return {
        isAuthenticated: isAuthenticated(),
        login,
        logout,
        register,
        keycloak,
    };
};
