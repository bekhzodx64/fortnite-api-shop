import { useEffect, useMemo, useState, useTransition } from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { RiCloseCircleLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getTotals } from '../../features/cartSlice'
import { CgMenuGridO } from 'react-icons/cg'
import { FaWindowClose } from 'react-icons/fa'
import { BiLink } from 'react-icons/bi'

const Header = () => {
	const dispatch = useDispatch()
	const { cartTotalQuantity } = useSelector((state) => state.cart)
	const { skins } = useSelector((state) => state.skin)
	const cart = useSelector((state) => state.cart)

	const [searchValue, setSearchValue] = useState('')
	const [showMenu, setShowMenu] = useState(false)

	const [showSearch, setShowSearch] = useState(false)
	const navigate = useNavigate()

	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		dispatch(getTotals())
	}, [cart, dispatch])

	const handleToTop = () => {
		window.scrollTo(0, 0)
	}

	const handleShowMenu = () => {
		setShowMenu(!showMenu)
	}

	const onSearchChange = (e) => {
		const valueToLowerCase = e.target.value.toLowerCase()
		setSearchValue(valueToLowerCase)
		startTransition(() => {
			setSearchValue(e.target.value)
		})
	}

	const filteredItems = useMemo(() => {
		return skins.filter((skin) => skin.name.toLowerCase().includes(searchValue))
	}, [searchValue, skins])

	const handleShowSearch = () => {
		setShowSearch(!showSearch)
	}

	return (
		<header className='bg-blue-600 sticky top-0 z-50'>
			<div className='container text-white py-5 flex justify-between sm:grid sm:grid-cols-3 items-center'>
				<ul className='hidden sm:block'>
					<li>
						<Link to='/all-products'>Все скины</Link>
					</li>
				</ul>
				<div className='font-bold text-2xl sm:text-3xl uppercase sm:text-center'>
					<Link to='/' onClick={handleToTop}>
						fortnite.api
					</Link>
				</div>
				<div className='justify-self-end items-center space-x-3 flex'>
					{showSearch && (
						<div className='relative hidden sm:block'>
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
													navigate(`/all-products/${filteredSkin.id}`)
													setShowSearch(false)
													setSearchValue('')
												}
												return (
													<div
														key={filteredSkin.id}
														className='border flex space-x-3 cursor-pointer'
														onClick={onNavigateHandler}
													>
														<div className='max-w-[80px] w-full h-20 border-r'>
															<img
																src={filteredSkin.images.icon}
																alt={filteredSkin.name}
																className='w-full h-full object-cover'
															/>
														</div>
														<p>{filteredSkin.name}</p>
													</div>
												)
											})
										)}
									</div>
								)}
							</div>
						</div>
					)}

					<button
						type='button'
						onClick={handleShowSearch}
						className='hidden sm:block'
					>
						{showSearch ? (
							<RiCloseCircleLine className='w-10 h-10' />
						) : (
							<FiSearch className='w-10 h-10' />
						)}
					</button>

					<Link to='/cart' onClick={handleToTop}>
						<div className='relative flex items-center'>
							<AiOutlineShopping className='text-4xl sm:w-12 sm:h-12' />
							<span className='absolute top-[38%] text-sm right-1/2 translate-x-1/2  w-6 h-6 text-white font-bold flex justify-center items-center select-none'>
								{cartTotalQuantity || null}
							</span>
						</div>
					</Link>

					<button
						type='button'
						className='block sm:hidden'
						onClick={handleShowMenu}
					>
						{showMenu ? (
							<CgMenuGridO className='text-4xl' />
						) : (
							<FaWindowClose className='text-4xl' />
						)}
					</button>
				</div>
			</div>

			{showMenu && (
				<div
					className='fixed right-0 bottom-0 left-0 top-[77px] backdrop-blur-md bg-black/30 sm:hidden'
					onClick={handleShowMenu}
				>
					<div
						className='w-[85vw] h-full bg-white ml-auto p-5 space-y-5'
						onClick={(e) => e.stopPropagation()}
					>
						<ul className='text-xl flex flex-col items-center'>
							<li className='flex items-center space-x-2'>
								<BiLink />
								<Link to='/all-products'>Все скины</Link>
							</li>
						</ul>

						<div className='relative'>
							<input
								type='text'
								placeholder='Поиск...'
								className='placeholder:italic px-3 py-2 outline-none text-black w-full bg-gray-100'
								onChange={onSearchChange}
							/>
							<div className='absolute left-0 right-0 pt-6'>
								{searchValue && (
									<div className='bg-white shadow-md py-3 px-2 overflow-y-auto max-h-72 space-y-2 text-black'>
										{isPending ? (
											<p className='text-center py-2'>Поиск...</p>
										) : (
											filteredItems.map((filteredSkin) => {
												const onNavigateHandler = () => {
													navigate(`/all-products/${filteredSkin.id}`)
													setShowSearch(false)
													setSearchValue('')
												}
												return (
													<div
														key={filteredSkin.id}
														className='border flex space-x-3 cursor-pointer'
														onClick={onNavigateHandler}
													>
														<div className='max-w-[80px] w-full h-20 border-r'>
															<img
																src={filteredSkin.images.icon}
																alt={filteredSkin.name}
																className='w-full h-full object-cover'
															/>
														</div>
														<p>{filteredSkin.name}</p>
													</div>
												)
											})
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
