import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSongIdentifier } from '../state/songsSlice';

const MusicPlayerListSongsItem = ({ title, author, album, deleteSong, likeSong, isLiked, id }) => {

	const dispatch = useDispatch();
	const currentSongIdentifier = useSelector(state => state.songs.currentSongId);

	return (
		<div className={`music-player-list-songs-item ${currentSongIdentifier === id ? 'music-player-list-songs-item--active' : ''}`}
				 onClick={() => dispatch(setCurrentSongIdentifier({ id }))}>
			<div className={'music-player-list-songs-item-info'}>
				<p className={'song-title'}>{title}</p>
				<p className={'song-author'}>{album.length > 0 ? album : title} • {author}</p>
			</div>
			<div className={'music-player-list-songs-item-buttons'}>
				<button onClick={likeSong}><i className="bx bxs-heart" style={{ color: isLiked ? 'red' : '' }}/></button>
				<button onClick={deleteSong}><i className="bx bxs-trash-alt"/></button>
			</div>
		</div>
	);
};

export default MusicPlayerListSongsItem;