import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import skinsReducer, { skinsFetch } from '../features/skinsSlice';

export const store = configureStore({
	reducer: {
		skin: skinsReducer,
		cart: cartReducer,
	},
});

store.dispatch(skinsFetch());
