import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../config';

const initialState = {
	skins: [],
	isLoading: true,
};

export const skinsFetch = createAsyncThunk('skins/skinsFetch', async () => {
	const res = await fetch('https://fortniteapi.io/v2/items/list?lang=ru', {
		headers: {
			Authorization: API_KEY,
		},
	}).then((res) => res.json());
	return res.items;
});

const skinsSlice = createSlice({
	name: 'skins',
	initialState,
	reducers: {},
	extraReducers: {
		[skinsFetch.pending]: (state) => {
			state.isLoading = true;
		},
		[skinsFetch.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.skins = action.payload;
		},
		[skinsFetch.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export default skinsSlice.reducer;
