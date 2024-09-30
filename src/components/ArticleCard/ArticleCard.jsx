import './ArticleCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ArticleCard = ({ article }) => {
	const { title, description, urlToImage } = article;
	return (
		<Card>
			<CardContent>
				<div>
					<Avatar alt="image from article" src={urlToImage} variant="rounded">
						<AssignmentIcon />
					</Avatar>
					<Typography variant="h3">{title}</Typography>
				</div>
				<Typography variant="body1">{description}</Typography>
			</CardContent>
		</Card>
	);
};

export default ArticleCard;
