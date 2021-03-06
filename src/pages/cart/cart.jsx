import { BsArrowLeft } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
	addToCart,
	clearCart,
	decreaseCart,
	removeFromCart,
} from '../../features/cartSlice'

const Cart = () => {
	const cart = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleRemoveFromCart = (cartItem) => {
		dispatch(removeFromCart(cartItem))
	}

	const handleDecreaseCart = (cartItem) => {
		dispatch(decreaseCart(cartItem))
	}

	const handleIncreaseCart = (cartItem) => {
		dispatch(addToCart(cartItem))
	}

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	const handleToTop = () => {
		window.scrollTo(0, 0)
	}

	return (
		<div className='container py-8'>
			<h2 className='text-center py-5 font-bold text-2xl uppercase'>корзина</h2>

			{cart.cartItems.length === 0 ? (
				<div className='space-y-3'>
					<p className='text-center text-2xl'>Вы еще ничего не добавили</p>
					<div className='flex justify-center text-gray-500'>
						<Link
							to='/all-products'
							className='flex items-center space-x-3'
							onClick={handleToTop}
						>
							<BsArrowLeft className='text-xl' />
							<span className='text-xl'>К товарам</span>
						</Link>
					</div>
				</div>
			) : (
				<div className='flex flex-col 2xl:flex-row justify-between gap-10'>
					<div className='overflow-x-auto'>
						<div className='w-[728px] lg:w-full'>
							<ul className='grid grid-cols-5 border-b py-3 font-bold'>
								<li className='col-span-2'>Товар</li>
								<li className='justify-self-center'>Цена</li>
								<li className='justify-self-center'>Количество</li>
								<li className='justify-self-center'>Общая сумма</li>
							</ul>
							{cart.cartItems?.map((cartItem) => {
								const id = cartItem.id

								const onNavigateHandler = () => {
									navigate(`/all-products/${id}`)
								}
								return (
									<div
										key={cartItem.id}
										className='grid grid-cols-5 py-5 items-center'
									>
										<div className='col-span-2 flex gap-5'>
											<div
												className='w-36 h-36 cursor-pointer'
												onClick={onNavigateHandler}
											>
												<img
													src={cartItem.images.icon_background}
													alt={cartItem.name}
													className='w-full h-full object-cover'
												/>
											</div>

											<div className='w-full space-y-5'>
												<div>
													<h2 className='text-xl line-clamp-1'>
														{cartItem.name.toLowerCase()}
													</h2>
													<p className='line-clamp-2 text-sm'>
														{cartItem.description}
													</p>
												</div>
												<div>
													<button
														className='hover:text-red-500'
														onClick={() => handleRemoveFromCart(cartItem)}
													>
														Удалить
													</button>
												</div>
											</div>
										</div>
										<div className='justify-self-center'>
											<span>
												{cartItem.price === 0
													? 'Бесплатно'
													: `${cartItem.price} руб.`}
											</span>
										</div>
										<div className='justify-self-center'>
											<div className='border'>
												<button
													type='button'
													className={`py-3 px-5 ${
														cartItem.price === 0 &&
														'bg-gray-100 pointer-events-none select-none'
													}`}
													onClick={() => handleDecreaseCart(cartItem)}
												>
													-
												</button>
												<span className='px-4 select-none'>
													{cartItem.cartQuantity}
												</span>
												<button
													type='button'
													className={`py-3 px-5 ${
														cartItem.price === 0 &&
														'bg-gray-100 pointer-events-none select-none'
													}`}
													onClick={() => {
														handleIncreaseCart(cartItem)
													}}
												>
													+
												</button>
											</div>
										</div>
										<div className='justify-self-center'>
											<span>
												{cartItem.price === 0
													? 'Бесплатно'
													: `${cartItem.price * cartItem.cartQuantity} руб.`}
											</span>
										</div>
									</div>
								)
							})}
							<div className='border-t py-3 flex justify-end'>
								<button
									type='button'
									className='border rounded-md py-2 px-5 hover:bg-red-500 hover:text-white flex items-center space-x-2 group'
									onClick={() => {
										handleClearCart()
									}}
								>
									<FaTrashAlt className='text-red-500 group-hover:text-white' />
									<span>Очистить корзину</span>
								</button>
							</div>
						</div>
					</div>

					<div className='w-full max-w-xs space-y-3 ml-auto 2xl:ml-0 2xl:sticky top-28 h-[150px]'>
						<div className='flex justify-between text-xl'>
							<span>Всего:</span>
							<span>{cart.cartTotalAmount} руб.</span>
						</div>
						<div className='text-sm'>
							Цены на все товары указаны с учетом НДС
						</div>
						<div className='flex justify-center'>
							<button className='rounded-md py-2 w-full bg-blue-500 text-white'>
								Перейти к оплате
							</button>
						</div>

						<div className='text-gray-500'>
							<Link
								to='/all-products'
								className='items-center space-x-3 inline-flex'
								onClick={handleToTop}
							>
								<BsArrowLeft className='text-xl' />
								<span>Продолжить покупку</span>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Cart
