import './Article.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticleDate } from '../../lib/utils';

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

	const { source, author, title, url, urlToImage, publishedAt, content } =
		article || defaultArticle;

	console.log('content', content.length, content);

	return (
		<div id="featured-article">
			<h2>&#8220;{title}&#8221;</h2>
			<div className='attribution'>
				<p>
					{author} &#183; {source.name}
				</p>
				<p>{getArticleDate(new Date(publishedAt))}</p>
			</div>

			<div className="article-img-wrapper">
				<img src={urlToImage} alt="image accompanying article" />{' '}
			</div>
			<p className="content">{content}</p>
			<p>
				Read the entire article on{' '}
				<a href={url} target="_blank">
					{source.name}
				</a>
			</p>
		</div>
	);
};

export default Article;
