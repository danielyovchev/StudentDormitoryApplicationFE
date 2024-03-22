import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {Paths} from './utils/routeConstants'
import Home from './components/Home/Home'

function App() {
	return (
    <Router>
		<Routes>
			<Route path={Paths.HOME} element={<Home/>}></Route>
		</Routes>
	</Router>
  )
}

export default App
