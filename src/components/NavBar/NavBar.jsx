import './NavBar.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavIcon from '../ui/NavIcon/NavIcon';
import { HEADLINE_CATEGORIES, SOURCES } from '../../assets/constants';
import { getCurrentDate } from '../../lib/utils';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const emptyParams = {
		keywords: '',
		category: '',
		source: ''
	};

	const [paramValues, setParamValues] = useState({
		...emptyParams
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setParamValues(prevValues => ({
			...prevValues,
			[name]: value
		}));
	};

	const clearParams = () => {
		setParamValues({ ...emptyParams });
	};

	const handleClick = () => {
		setIsOpen(() => !isOpen);
	};

	const { keywords, category, source } = paramValues;

	return (
		<nav>
			<div id="nav-primary">
				<p id="date-display">{getCurrentDate()}</p>
				<h1>The Keuka Corrier</h1>
				<NavIcon isOpen={isOpen} handleClick={handleClick} />
			</div>
			<div id="nav-secondary" className={isOpen ? '' : 'hidden'}>
				<p>Custom Search:</p>
        <div id="nav-search-inputs">
				<input
					type="text"
					name="keywords"
					value={keywords}
					onChange={handleChange}
					placeholder="Search Keywords"
				/>
				<select name="category" value={category} onChange={handleChange}>
					<option value="">Category</option>
					{HEADLINE_CATEGORIES.map((category, idx) => (
						<option value={category} key={`search_${category}_${idx}`}>
							{category}
						</option>
					))}
				</select>
				<select name="source" value={source} onChange={handleChange}>
					<option value="">Source</option>
					{SOURCES.map((source_opt, idx) => (
						<option value={source_opt.id} key={`search_${source_opt.id}_${idx}`}>
							{source_opt.name}
						</option>
					))}
				</select></div>
			</div>
		</nav>
	);
};

export default NavBar;
