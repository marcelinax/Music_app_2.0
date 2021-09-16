import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MusicPlayerListSongsItem from './MusicPlayerListSongsItem';

const MusicPlayerListSongs = () => {
	const history = useHistory();
	const songs = useSelector(state => state.songs.songs);

	const renderSongs = () => {
		return songs.map(song => (
			<MusicPlayerListSongsItem author={song.author} title={song.title} album={song.album}/>
		));
	};

	return (
		<div className={'music-player-list-songs'}>
			<div className={'music-player-list-songs-top'}>
				<button onClick={() => history.push('/')}><i className="bx bxs-left-arrow-alt"/></button>
				<button onClick={() => history.push('/add-song')}><i className="bx bx-plus"/></button>
			</div>
			<div className={'music-player-list-songs-main'}>
				{renderSongs()}
			</div>
		</div>
	);
};

export default MusicPlayerListSongs;