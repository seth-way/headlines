import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Article from './components/Article/Article';
import CustomSearch from './components/CustomSearch/CustomSearch';
import Footer from './components/Footer/Footer';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import { HEADLINE_CATEGORIES } from './assets/constants';
import { filterArticles } from './lib/utils';
// DUMMY DATA
import { articles as generalArticles } from './assets/dummy-data/headlines/all.json';
import { articles as businessArticles } from './assets/dummy-data/headlines/business.json';
import { articles as entertainmentArticles } from './assets/dummy-data/headlines/entertainment.json';
import { articles as healthArticles } from './assets/dummy-data/headlines/health.json';
import { articles as scienceArticles } from './assets/dummy-data/headlines/science.json';
import { articles as sportsArticles } from './assets/dummy-data/headlines/sports.json';
import { articles as technologyArticles } from './assets/dummy-data/headlines/technology.json';


const articles = {
	general: generalArticles,
	business: businessArticles,
	entertainment: entertainmentArticles,
	health: healthArticles,
	science: scienceArticles,
	sports: sportsArticles,
	technology: technologyArticles,
};

HEADLINE_CATEGORIES.forEach(category => {
	articles[category] = filterArticles(articles[category]);
});

function App() {
	const [featuredArticle, setFeatured] = useState(null);
	const navigate = useNavigate();

	const handleClick = article => {
		setFeatured(article);
		navigate('/article');
	};

	return (
		<>
			<NavBar />
			<Routes>
				<Route
					exact
					path="/"
					element={<Home articles={articles} handleClick={handleClick} />}
				/>
				<Route
					path="/article"
					element={<Article article={featuredArticle} />}
				/>
				<Route path="/search" element={<CustomSearch handleClick={handleClick}/>}/>
				<Route path="error/:status" element={<ErrorMessage />} />
				<Route path="*" element={<ErrorMessage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
