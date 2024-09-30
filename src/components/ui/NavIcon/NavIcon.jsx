import './NavIcon.css';

const NavIcon = ({isOpen, handleClick}) => {
	return (
		<svg id="nav-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
			<circle cx="50" cy="50" r="45" />
		</svg>
	);
};

export default NavIcon;
