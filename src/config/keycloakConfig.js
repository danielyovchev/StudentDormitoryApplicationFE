import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'your-realm-name', 
    clientId: 'your-frontend-client-id'
});

export default keycloak;