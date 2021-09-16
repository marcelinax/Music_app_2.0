import { configureStore } from '@reduxjs/toolkit';
import songsSlice from './state/songsSlice';

export default configureStore({
	reducer: {
		songs: songsSlice
	},
});