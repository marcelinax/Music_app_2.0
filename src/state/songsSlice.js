import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const saveSongsInLocalStorage = (state) => {
	localStorage.setItem('songs', JSON.stringify(state));
};

const loadSongsFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem('songs') || '[]');
};
const saveCurrentSongIdInLocalStorage = (state) => {
	localStorage.setItem('currentSongId', state);
};

const loadCurrentSongIdFromLocalStorage = () => {
	return localStorage.getItem('currentSongId') || loadSongsFromLocalStorage()[0].id;
};

export const songsSlice = createSlice({
	name: 'songs',
	initialState: {
		'songs': loadSongsFromLocalStorage(),
		'currentSongId': loadCurrentSongIdFromLocalStorage()
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
				isLiked: false,
				id: uuidv4()
			};
			state.songs = [...state.songs, newSong];
			saveSongsInLocalStorage(state.songs);
		},
		likeSong: (state, action) => {
			const { id } = action.payload;
			const likeStartIndex = state.songs.map(song => song.id).indexOf(id);
			state.songs[likeStartIndex].isLiked = !state.songs[likeStartIndex].isLiked;
			state.songs = [...state.songs];
			saveSongsInLocalStorage(state.songs);
		},
		deleteSong: (state, action) => {
			const { id } = action.payload;
			const deleteStartIndex = state.songs.map(song => song.id).indexOf(id);
			state.songs.splice(deleteStartIndex, 1);
			state.songs = [...state.songs];
			if (state.currentSongId === id) {
				state.currentSongId = state.songs[0].id;
				saveCurrentSongIdInLocalStorage(state.currentSongId);
			}
			saveSongsInLocalStorage(state.songs);
		},
		setCurrentSongIdentifier: (state, action) => {
			const { id } = action.payload;
			const index = state.songs.map(song => song.id).indexOf(id);
			state.currentSongId = state.songs[index].id;
			saveCurrentSongIdInLocalStorage(state.currentSongId);
		}

	}


});

export const { setSong, likeSong, deleteSong, setCurrentSongIdentifier } = songsSlice.actions;
export default songsSlice.reducer;