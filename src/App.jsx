import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Article from './components/Article/Article';
import CustomSearch from './components/CustomSearch/CustomSearch';
import Footer from './components/Footer/Footer';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import { HEADLINE_CATEGORIES } from './assets/constants';
import { filterArticles } from './lib/utils';
import { getAllHeadlines } from './lib/apiCalls';

function App() {
	const [articles, setArticles] = useState({});
	const [featuredArticle, setFeatured] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchArticles = async () => {
			const headlines = await getAllHeadlines();
			if (headlines instanceof Error) navigate('/error/' + headlines.status || 500);
			setArticles(() => headlines);
			console.log(headlines);
		};

		fetchArticles();
	}, [navigate]);

	const handleClick = article => {
		setFeatured(article);
		navigate('/article');
	};

	return (
		<>
			<NavBar />
			<Routes>
				<Route exact path="/" element={<Home articles={articles} handleClick={handleClick} />} />
				<Route path="/article" element={<Article article={featuredArticle} />} />
				<Route path="/search" element={<CustomSearch handleClick={handleClick} />} />
				<Route path="error/:status" element={<ErrorMessage />} />
				<Route path="*" element={<ErrorMessage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
