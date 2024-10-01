const baseUrl = 'https://newsapi.org/v2/top-headlines/?country=us';

export const getAllHeadlines = async () => {
	const response = await fetch(baseUrl);
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

export const searchCategory = async (category) => {
	try {
		const response = await fetch(baseUrl + '&category=' + category, {
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
}