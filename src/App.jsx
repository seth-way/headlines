import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="error/:status" element={<ErrorMessage />} />
				<Route path="*" element={<ErrorMessage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
