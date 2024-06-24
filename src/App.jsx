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
import RuleModification from './components/RuleModification/RuleModification'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import AttributeModification from './components/AttributeModifcation/AttributeModification'
import StudentRanking from './components/StudentRanking/StudentRanking'
import ApplicationsReview from './components/ApplicationsReview/ApplicationsReview'
import { StudentProvider } from './contexts/StudentContext'
import { ToastContainer } from 'react-toastify'
import './translation/i18n';

const initOptions = {
	onLoad: 'check-sso', // Automatically redirect to Keycloak login if not authenticated
	flow: 'standard'          // Use the standard authorization code flow
};

function App() {
	return (
		<ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
			<StudentProvider>
				<Router>
					<ToastContainer />
					<Header />
					<Routes>
						<Route path={Paths.HOME} element={<Home />}></Route>
						<Route path={Paths.ABOUT} element={<About />}></Route>
						<Route path={Paths.CONTACTS} element={<Contacts />}></Route>
						<Route path={Paths.INFO} element={<Information />}></Route>
						{/* <Route path={Paths.LOGIN} element={<Login />}></Route>
					<Route path={Paths.REGISTER} element={<Register />}></Route> */}
						<Route path={Paths.APPLY} element={<Apply />}></Route>
						<Route path={Paths.FAMILY} element={<FamilyInfo />}></Route>
						<Route path={Paths.OVERVIEW} element={<ApplicationDashboard />}></Route>
						<Route path={Paths.ADMIN} element={<AdminDashboard />}></Route>
						<Route path={Paths.RULES} element={<RuleModification />}></Route>
						<Route path={Paths.ATTRIBUTES} element={<AttributeModification />}></Route>
						<Route path={Paths.RANKING} element={<StudentRanking />}></Route>
						<Route path={Paths.APPLICATIONS} element={<ApplicationsReview />}></Route>
					</Routes>
					<Footer />
				</Router>
			</StudentProvider>
		</ReactKeycloakProvider>
	)
}

export default App
