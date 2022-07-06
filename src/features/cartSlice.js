import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
	cartItems: localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: [],
	cartTotalQuantity: 0,
	cartTotalAmount: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].cartQuantity += 1;
				toast.info(
					`Увеличено количество товара ${state.cartItems[itemIndex].name} `
				);
			} else {
				const tempProduct = { ...action.payload, cartQuantity: 1 };
				state.cartItems.push(tempProduct);
				toast.success(`${action.payload.name} добавлено в корзину`);
			}
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		addToCartDetail: (state, action) => {
			// const tempProduct = { ...action.payload, cartQuantity: 1 };
			// state.cartItems.push(tempProduct);
		},
		removeFromCart: (state, action) => {
			const nextCartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== action.payload.id
			);

			state.cartItems = nextCartItems;

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

			toast.error(`${action.payload.name} удалено с корзины`);
		},
		decreaseCart: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(cartItem) => cartItem.id === action.payload.id
			);

			if (state.cartItems[itemIndex].cartQuantity > 1) {
				state.cartItems[itemIndex].cartQuantity -= 1;
				toast.info(`Количество ${action.payload.name} уменьшено`);
			} else if (state.cartItems[itemIndex].cartQuantity === 1) {
				const nextCartItems = state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id
				);

				state.cartItems = nextCartItems;

				toast.error(`${action.payload.name} удалено из корзины`);
			}
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		clearCart: (state, action) => {
			state.cartItems = [];
			toast.error('Корзина очищено');
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		getTotals: (state, action) => {
			let { total, quantity } = state.cartItems.reduce(
				(cartTotal, cartItem) => {
					const { price, cartQuantity } = cartItem;
					const itemTotal = price * cartQuantity;
					cartTotal.total += itemTotal;
					cartTotal.quantity += cartQuantity;

					return cartTotal;
				},
				{
					total: 0,
					quantity: 0,
				}
			);
			state.cartTotalQuantity = quantity;
			state.cartTotalAmount = total;
		},
	},
});

export const {
	addToCart,
	addToCartDetail,
	removeFromCart,
	decreaseCart,
	clearCart,
	getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
