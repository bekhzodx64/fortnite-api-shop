import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='mt-auto bg-blue-600'>
			<div className='container text-white py-3 flex justify-between items-center'>
				<Link to='/'>
					<span className='uppercase text-xl'>fortnite.api</span>
				</Link>

				<p className='text-xl'>
					<a
						href='https://github.com/bekhzodx64/fortnite-api-shop'
						target='blank'>
						Github repo
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
