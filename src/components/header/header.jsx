import { Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getTotals } from '../../features/cartSlice';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useState } from 'react';
import { API_KEY } from '../../config';

const Header = () => {
	const dispatch = useDispatch();
	const { cartTotalQuantity } = useSelector((state) => state.cart);
	const { skins } = useSelector((state) => state.skin);
	const cart = useSelector((state) => state.cart);
	const [searchValue, setSearchValue] = useState('');
	const [showSearch, setShowSearch] = useState(false);

	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch]);

	useEffect(() => {
		const res = async () => {
			await fetch(`https://fortniteapi.io/v2/items/list?lang=ru`, {
				headers: {
					Authorization: API_KEY,
				},
			}).then((res) => res.json());
		};
		return res.filter((item) => {
			return item.name.toLowerCase().includes(searchValue);
		});
	}, [searchValue]);

	useEffect(() => {}, []);

	const handleToTop = () => {
		window.scrollTo(0, 0);
	};

	const onSearchChange = (e) => {
		const valueToLowerCase = e.target.value.toLowerCase();
		setSearchValue(valueToLowerCase);
	};

	// function handleSearch() {
	// 	return skins.filter((skin) => {
	// 		return skin.name.toLowerCase().includes(searchValue);
	// 	});
	// }

	// const filteredSkins = handleSearch();

	const handleShowSearch = () => {
		setShowSearch(!showSearch);
	};

	// const onNavigateHandler = () => {
	// 	navigate(`/all-products/${id}`);
	// };

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
										{/* {filteredSkins.map((filteredSkin) => (
											<div
												key={filteredSkin.id}
												className='border flex space-x-3'>
												<div className='max-w-[80px] w-full h-20 border-r'>
													<img
														src={filteredSkin.images.icon}
														alt={filteredSkin.name}
														className='w-full h-full object-cover'
													/>
												</div>
												<p>{filteredSkin.name}</p>
											</div>
										))} */}
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
