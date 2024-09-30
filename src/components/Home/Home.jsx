import './Home.css';
import CardGroup from '../CardGroup/CardGroup';
import { HEADLINE_CATEGORIES } from '../../assets/constants';


const Home = ({articles, handleClick}) => {
	return (
		<div id='home'>
			<CardGroup
				category="top headlines"
				cardCount={8}
				articles={articles.general}
				handleClick={handleClick}
			/>
			{HEADLINE_CATEGORIES.map((type, idx) => (
				<CardGroup
					key={`c-group_${idx}`}
					category={type}
					cardCount={4}
					articles={articles[type]}
					handleClick={handleClick}
				/>
			))}
		</div>
	);
};

export default Home;
