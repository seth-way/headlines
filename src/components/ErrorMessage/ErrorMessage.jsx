import { useParams } from 'react-router-dom';
import './ErrorMessage.css';

const ErrorMessage = () => {
	const { status } = useParams();
	const statusCode = status || 404;
	return (
		<div id='error-message'>
			<h2>{`Error: ${statusCode}`}</h2>
			<p>We sincerely apologize.
        <br/>Something went wrong.</p>
		</div>
	);
};

export default ErrorMessage

