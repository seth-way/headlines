import './CardGroup.css';
import Typography from '@mui/material/Typography';

import ArticleCard from '../ArticleCard/ArticleCard';

const CardGroup = ({ category, cardCount, articles }) => {
	return (
		<section className='card-group'>
			<Typography variant="h2">{category}</Typography>
			{articles && (
				<div>
					{articles.slice(0, cardCount).map((article, idx) => (
						<ArticleCard key={`article_${category}_${idx}`} article={article} />
					))}
				</div>
			)}
		</section>
	);
};

export default CardGroup;
