import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='bg-blue-600'>
			<div className='container text-white py-5 grid grid-cols-3 items-center'>
				<ul>
					<li>
						<Link to='/all-skins'>Все скины</Link>
					</li>
				</ul>
				<div className='font-bold text-3xl uppercase text-center'>
					<Link to='/'>fortnite.api</Link>
				</div>
				<div className='justify-self-end'>actions</div>
			</div>
		</header>
	);
};

export default Header;
