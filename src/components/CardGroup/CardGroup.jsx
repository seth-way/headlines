import './CardGroup.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

import ArticleCard from '../ArticleCard/ArticleCard';

const CardGroup = ({ category, articles, cardCount = articles.length, handleClick }) => {
	const navigate = useNavigate();
	const handleCategoryClick = () => {
		navigate('/search/?category=' + category);
	};

	const isSearchable = category && category !== 'top headlines' && category !== 'search results';

	return (
		<section className="card-group">
			{isSearchable ? (
				<h2 onClick={handleCategoryClick} className="searchable">
					{category}
				</h2>
			) : (
				<h2>{category}</h2>
			)}
			{articles ? (
				<div>
					{articles.slice(0, cardCount).map((article, idx) => (
						<ArticleCard
							key={`article_${category}_${idx}`}
							article={article}
							handleClick={handleClick}
						/>
					))}
				</div>
			) : (
				<Loading />
			)}
		</section>
	);
};

export default CardGroup;
