import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Paths } from './utils/routeConstants'
import Home from './components/Home/Home'
import About from './components/About/About'
import Information from './components/Information/Information'
import Contacts from './components/Contacts/Contacts'
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
import DocumentsReview from './components/ApplicationsReview/DocumentsReview/DocumentsReview'
import { StudentProvider } from './contexts/StudentContext'
import { ToastContainer } from 'react-toastify'
import './translation/i18n';
import PrivateRoute from './components/Guard/PrivateRoute'
import NotAuthorized from './components/Guard/NotAuthorized'
import { FamilyProvider } from './contexts/FamilyContext'

const initOptions = {
	onLoad: 'check-sso',
	flow: 'standard'
};

function App() {
	return (
		<ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>

			<Router>
				<StudentProvider>
					<FamilyProvider>
						<ToastContainer />
						<Header />
						<Routes>
							<Route path={Paths.HOME} element={<Home />}></Route>
							<Route path={Paths.ABOUT} element={<About />}></Route>
							<Route path={Paths.CONTACTS} element={<Contacts />}></Route>
							<Route path={Paths.INFO} element={<Information />}></Route>
							<Route path={Paths.APPLY} element={
								<PrivateRoute roles={['student']}>
									<Apply />
								</PrivateRoute>
							}></Route>
							<Route path={Paths.FAMILY} element={<PrivateRoute roles={['student']}>
								<FamilyInfo />
							</PrivateRoute>}></Route>
							<Route path={Paths.OVERVIEW} element={<PrivateRoute roles={['student']}>
								<ApplicationDashboard />
							</PrivateRoute>}></Route>
							<Route path={Paths.ADMIN} element={
								<PrivateRoute roles={['admin']}>
									<AdminDashboard />
								</PrivateRoute>
							}></Route>
							<Route path={Paths.RULES} element={
								<PrivateRoute roles={['admin']}>
									<RuleModification />
								</PrivateRoute>}></Route>
							<Route path={Paths.ATTRIBUTES} element={
								<PrivateRoute roles={['admin']}>
									<AttributeModification />
								</PrivateRoute>}></Route>
							<Route path={Paths.RANKING} element={<StudentRanking />}></Route>
							<Route path={Paths.APPLICATIONS} element={
								<PrivateRoute roles={['admin']}>
									<ApplicationsReview />
								</PrivateRoute>
							}></Route>
							<Route path={Paths.DOCUMENTS} element={
								<PrivateRoute roles={['admin']}>
									<DocumentsReview />
								</PrivateRoute>}></Route>
							<Route path={Paths.UNAUTHORIZED} element={<NotAuthorized />}></Route>
						</Routes>
						<Footer />
					</FamilyProvider>
				</StudentProvider>
			</Router>

		</ReactKeycloakProvider>
	)
}

export default App
