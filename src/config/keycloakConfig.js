import Keycloak from 'keycloak-js';

const keycloakConfig = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'dormitoryApplication', 
    clientId: 'dormitory-backend'
});

export default keycloakConfig;