import { useKeycloak } from '@react-keycloak/web';
import { Paths } from '../../utils/routeConstants';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute ({children, roles}) {
    const { keycloak } = useKeycloak();

    const isAuthenticated = keycloak.authenticated;
    const hasRole = roles.some(role => keycloak.hasRealmRole(role));

    if (!isAuthenticated) {
        keycloak.login();
        return null;
    }

    if (!hasRole) {
        return <Navigate to={Paths.UNAUTHORIZED} />;
    }

    return children;
}