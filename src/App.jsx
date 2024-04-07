import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {Paths} from './utils/routeConstants'
import Home from './components/Home/Home'
import About from './components/About/About'

function App() {
	return (
    <Router>
		<Routes>
			<Route path={Paths.HOME} element={<Home/>}></Route>
			<Route path={Paths.ABOUT} element={<About/>}></Route>
		</Routes>
	</Router>
  )
}

export default App
