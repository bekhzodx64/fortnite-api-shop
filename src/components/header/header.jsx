import { useEffect, useMemo, useState, useTransition } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getTotals } from '../../features/cartSlice';

const Header = () => {
	const dispatch = useDispatch();
	const { cartTotalQuantity } = useSelector((state) => state.cart);
	const { skins } = useSelector((state) => state.skin);
	const cart = useSelector((state) => state.cart);

	const [searchValue, setSearchValue] = useState('');

	const [showSearch, setShowSearch] = useState(false);
	const navigate = useNavigate();

	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch]);

	const handleToTop = () => {
		window.scrollTo(0, 0);
	};

	const onSearchChange = (e) => {
		const valueToLowerCase = e.target.value.toLowerCase();
		setSearchValue(valueToLowerCase);
		startTransition(() => {
			setSearchValue(e.target.value);
		});
	};

	const filteredItems = useMemo(() => {
		return skins.filter((skin) =>
			skin.name.toLowerCase().includes(searchValue)
		);
	}, [searchValue, skins]);

	const handleShowSearch = () => {
		setShowSearch(!showSearch);
	};

	return (
		<header className='bg-blue-600 sticky top-0 z-50'>
			<div className='container text-white py-5 grid grid-cols-3 items-center'>
				<ul>
					<li>
						<Link to='/all-products'>Все скины</Link>
					</li>
				</ul>
				<div className='font-bold text-3xl uppercase text-center'>
					<Link to='/' onClick={handleToTop}>
						fortnite.api
					</Link>
				</div>
				<div className='justify-self-end flex items-center space-x-3'>
					{showSearch && (
						<div className='relative'>
							<input
								type='text'
								placeholder='Поиск...'
								className='placeholder:italic px-3 py-2 outline-none text-black'
								onChange={onSearchChange}
								autoFocus={true}
							/>
							<div className='absolute w-96 right-0 pt-6'>
								{searchValue && (
									<div className='bg-white shadow-md py-3 px-2 overflow-y-auto max-h-72 space-y-2 text-black'>
										{isPending ? (
											<p className='text-center py-2'>Поиск...</p>
										) : (
											filteredItems.map((filteredSkin) => {
												const onNavigateHandler = () => {
													navigate(`/all-products/${filteredSkin.id}`);
													setShowSearch(false);
													setSearchValue('');
												};
												return (
													<div
														key={filteredSkin.id}
														className='border flex space-x-3 cursor-pointer'
														onClick={onNavigateHandler}>
														<div className='max-w-[80px] w-full h-20 border-r'>
															<img
																src={filteredSkin.images.icon}
																alt={filteredSkin.name}
																className='w-full h-full object-cover'
															/>
														</div>
														<p>{filteredSkin.name}</p>
													</div>
												);
											})
										)}
									</div>
								)}
							</div>
						</div>
					)}

					<button type='button' onClick={handleShowSearch}>
						{showSearch ? (
							<RiCloseCircleLine className='w-10 h-10' />
						) : (
							<FiSearch className='w-10 h-10' />
						)}
					</button>
					<Link to='/cart' onClick={handleToTop}>
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
