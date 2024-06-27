import { useKeycloak } from '@react-keycloak/web';
import { Paths } from '../../utils/routeConstants';
import { Navigate } from 'react-router-dom';
import React from 'react';

export default function PrivateRoute({ children, roles }) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        keycloak.login();
        return null;
    }

    const hasRole = roles.some(role => keycloak.hasRealmRole(role));

    if (!hasRole) {
        return <Navigate to={Paths.UNAUTHORIZED} />;
    }

    return children;
}
