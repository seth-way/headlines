import './Article.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultArticle = {
	source: '',
	author: '',
	title: '',
	description: '',
	url: '',
	urlToImage: '',
	publishedAt: '',
	content: ''
};

const Article = ({ article }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!article) navigate('..', { relative: 'path' });
	}, [article, navigate]);

	const { source, author, title, description, url, urlToImage, publishedAt, content } =
		article || defaultArticle;

	console.log('content', content.length, content);

	return (
		<div id="featured-article">
			<h2>{title}</h2>
			<div className="article-img-wrapper">
				<p>{author}</p>
				<p>{source.name}</p>
				<p>{publishedAt}</p>
				<img src={urlToImage} alt="image accompanying article" />
				<p>{content}</p>
				<p>
					Read the rest of the article on{' '}
					<a href={url} target="_blank">
						{source.name}
					</a>
				</p>
			</div>
		</div>
	);
};

export default Article;
