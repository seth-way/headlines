import './Home.css';
import { useState, useEffect } from 'react';
import CardGroup from '../CardGroup/CardGroup';
import { HEADLINE_CATEGORIES } from '../../assets/constants';
import { filterArticles } from '../../lib/utils';
// DUMMY DATA
import { articles as generalArticles } from '../../assets/dummy-data/headlines/all.json';
import { articles as businessArticles } from '../../assets/dummy-data/headlines/business.json';
import { articles as entertainmentArticles } from '../../assets/dummy-data/headlines/entertainment.json';
import { articles as healthArticles } from '../../assets/dummy-data/headlines/health.json';
import { articles as scienceArticles } from '../../assets/dummy-data/headlines/science.json';
import { articles as sportsArticles } from '../../assets/dummy-data/headlines/sports.json';
import { articles as technologyArticles } from '../../assets/dummy-data/headlines/technology.json';

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

const Home = () => {
	console.log('sports', articles.sports);
	return (
		<main>
			<>
				<CardGroup
					category="top headlines"
					cardCount={8}
					articles={articles.general}
				/>
				{HEADLINE_CATEGORIES.map((type, idx) => (
					<CardGroup
						key={`c-group_${idx}`}
						category={type}
						cardCount={4}
						articles={articles[type]}
					/>
				))}
			</>
		</main>
	);
};

export default Home;
