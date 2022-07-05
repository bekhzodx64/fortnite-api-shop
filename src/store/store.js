import { configureStore } from '@reduxjs/toolkit';
import skinsReducer, { skinsFetch } from '../features/skinsSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
	reducer: {
		skin: skinsReducer,
		cart: cartReducer,
	},
});

store.dispatch(skinsFetch());
