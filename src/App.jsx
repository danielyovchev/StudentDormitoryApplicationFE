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

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path={Paths.HOME} element={<Home />}></Route>
				<Route path={Paths.ABOUT} element={<About />}></Route>
				<Route path={Paths.CONTACTS} element={<Contacts />}></Route>
				<Route path={Paths.INFO} element={<Information />}></Route>
				<Route path={Paths.LOGIN} element={<Login />}></Route>
				<Route path={Paths.REGISTER} element={<Register />}></Route>
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
