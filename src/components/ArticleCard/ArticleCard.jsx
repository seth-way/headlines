import './ArticleCard.css';

const ArticleCard = ({ article, handleClick }) => {
	const { title, description, urlToImage } = article;

	return (
		<article onClick={() => handleClick(article)}>
			<div className='card-header'>
				<div className="card-img-wrapper">
					<img alt="image from article" src={urlToImage} />
				</div>
				<div className='headline-wrapper'>
				<h3>{title}</h3></div>
			</div>
			<p>{description}</p>
		</article>
	);
};

export default ArticleCard;
