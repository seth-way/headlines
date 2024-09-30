import './CustomSearch.css';
import { useSearchParams } from 'react-router-dom';

const CustomSearch = () => {
	const [searchParams] = useSearchParams();
	console.log('params', searchParams);
	return <div>CustomSearch</div>;
};

export default CustomSearch;
