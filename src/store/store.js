import { configureStore } from '@reduxjs/toolkit';
import skinsReducer, { skinsFetch } from '../features/skinsSlice';

export const store = configureStore({
	reducer: {
		skin: skinsReducer,
	},
});

store.dispatch(skinsFetch());
