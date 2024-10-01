import './NavIcon.css';

const NavIcon = ({ isOpen, handleClick }) => {
	return (
		<svg
			id="nav-icon"
			className={isOpen ? 'open' : ''}
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			onClick={handleClick}
			stroke="var(--text)"
			strokeWidth={8}
			strokeLinecap="round"
			fill="var(--background">
			<g id="g1">
				<path d="M10,20 L90,20" />
				<circle cx="70" cy="20" r="10" />
			</g>
			<g id="g2">
				<path d="M10,50 L90,50" />
				<circle cx="30" cy="50" r="10" />
			</g>
			<g id="g3">
				<path d="M10,80 L90,80" />
				<circle cx="60" cy="80" r="10" />
			</g>
		</svg>
	);
};

export default NavIcon;
