import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Paths } from './utils/routeConstants'
import Home from './components/Home/Home'
import About from './components/About/About'
import Information from './components/Information/Information'
import Contacts from './components/Contacts/Contacts'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './config/keycloakConfig';
import Apply from './components/Apply/Apply'
import FamilyInfo from './components/FamilyInfo/FamilyInfo'
import ApplicationDashboard from './components/ApplicationDashboard/ApplicationDashboard'

const initOptions = {
    onLoad: 'login-required', // Automatically redirect to Keycloak login if not authenticated
    flow: 'standard'          // Use the standard authorization code flow
};

function App() {
	return (
		<ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
			<Router>
				<Header />
				<Routes>
					<Route path={Paths.HOME} element={<Home />}></Route>
					<Route path={Paths.ABOUT} element={<About />}></Route>
					<Route path={Paths.CONTACTS} element={<Contacts />}></Route>
					<Route path={Paths.INFO} element={<Information />}></Route>
					<Route path={Paths.LOGIN} element={<Login />}></Route>
					<Route path={Paths.REGISTER} element={<Register />}></Route>
					<Route path={Paths.APPLY} element={<Apply />}></Route>
					<Route path={Paths.FAMILY} element={<FamilyInfo />}></Route>
					<Route path={Paths.OVERVIEW} element={<ApplicationDashboard />}></Route>
				</Routes>
				<Footer />
			</Router>
		</ReactKeycloakProvider>
	)
}

export default App
