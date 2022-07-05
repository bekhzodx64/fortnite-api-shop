import { Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getTotals } from '../../features/cartSlice';
import { useEffect } from 'react';

const Header = () => {
	const { cartTotalQuantity } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch]);

	return (
		<header className='bg-blue-600 sticky top-0'>
			<div className='container text-white py-5 grid grid-cols-3 items-center'>
				<ul>
					<li>
						<Link to='/all-skins'>Все скины</Link>
					</li>
				</ul>
				<div className='font-bold text-3xl uppercase text-center'>
					<Link to='/'>fortnite.api</Link>
				</div>
				<div className='justify-self-end'>
					<Link to='/cart'>
						<div className='relative flex items-center'>
							<AiOutlineShopping className='w-12 h-12' />
							<span className='absolute top-[38%] text-sm right-1/2 translate-x-1/2  w-6 h-6 text-white font-bold flex justify-center items-center select-none'>
								{cartTotalQuantity || null}
							</span>
						</div>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
