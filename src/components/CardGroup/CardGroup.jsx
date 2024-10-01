import './CardGroup.css';

import ArticleCard from '../ArticleCard/ArticleCard';

const CardGroup = ({ category, articles, cardCount=articles.length, handleClick }) => {
	return (
		<section className='card-group'>
			<h2>{category}</h2>
			{articles && (
				<div>
					{articles.slice(0, cardCount).map((article, idx) => (
						<ArticleCard key={`article_${category}_${idx}`} article={article} handleClick={handleClick}/>
					))}
				</div>
			)}
		</section>
	);
};

export default CardGroup;
