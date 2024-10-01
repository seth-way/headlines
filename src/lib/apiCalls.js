import { filterArticles } from './utils';
import { HEADLINE_CATEGORIES } from '../assets/constants';
const baseUrl = 'https://newsapi.org/v2/top-headlines/?country=us';

const searchCategory = async category => {
	try {
		const response = await fetch(baseUrl + '&category=' + category, {
			headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const { articles } = await response.json();
		return [category, articles];
	} catch (err) {
		return err;
	}
};

export const getAllHeadlines = async () => {
	const allArticles = {};
	try {
		const response = await fetch(baseUrl, {
			headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const { articles } = await response.json();
		allArticles.general = articles;
		const articlesByCategory = await Promise.all(
			HEADLINE_CATEGORIES.map(category => searchCategory(category))
		);
		articlesByCategory.forEach(([category, categoryArticles]) => {
			allArticles[category] = filterArticles(categoryArticles);
		});
		return allArticles;
	} catch (err) {
		return err;
	}
};

export const searchHeadlines = async query => {
	const search = query.replaceAll('keywords', 'q').replace('?', '&');
	try {
		const response = await fetch(baseUrl + search, {
			headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const { articles } = await response.json();
		return articles;
	} catch (err) {
		return err;
	}
};
