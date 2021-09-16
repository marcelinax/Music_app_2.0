import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const saveSongsInLocalStorage = (state) => {
	localStorage.setItem('songs', JSON.stringify(state));
};

const loadSongsFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem('songs') || '[]');
};

export const songsSlice = createSlice({
	name: 'songs',
	initialState: {
		'songs': loadSongsFromLocalStorage()
	},
	reducers: {
		setSong: (state, action) => {
			const { title, duration, author, album, coverUrl, audioUrl } = action.payload;
			const newSong = {
				title,
				duration,
				author,
				album,
				coverUrl,
				audioUrl,
				id: uuidv4()
			};
			state.songs = [...state.songs, newSong];
			saveSongsInLocalStorage(state.songs);
		}
	}


});

export const { setSong } = songsSlice.actions;
export default songsSlice.reducer;