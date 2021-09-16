import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeSong } from '../state/songsSlice';

const MusicPlayer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const songs = useSelector(state => state.songs.songs);

	const [currentSongId, setCurrentSongId] = useState(songs[0].id);


	const getCurrentSongIndex = () => {
		return songs.map(song => song.id).indexOf(currentSongId);
	};

	const currentSong = () => {
		return songs[getCurrentSongIndex()];
	};

	const goNextSong = () => {
		const songIndex = getCurrentSongIndex();
		if (songIndex >= songs.length - 1) setCurrentSongId(songs[0].id);
		else setCurrentSongId(songs[songIndex + 1].id);

	};

	const goPreviousSong = () => {
		const songIndex = getCurrentSongIndex();
		if (songIndex <= 0) setCurrentSongId(songs[songs.length - 1].id);
		else setCurrentSongId(songs[songIndex - 1].id);
	};


	const renderMusicPlayer = () => {
		return <div className={'music-player'}>
			<div className={'music-player-top'}>
				<button onClick={() => {
					dispatch(likeSong({ id: currentSong().id }));
				}}><i className="bx bxs-heart" style={{ color: currentSong().isLiked ? 'red' : '' }}/></button>
				<p>PLAYING NOW</p>
				<button onClick={() => history.push('/songs-list')}><i className="bx bx-menu"/></button>
			</div>
			<div className={'music-player-main'}>
				<div className={'music-player-main-song-cover'} style={{ backgroundImage: `url(${currentSong().coverUrl})` }}/>
				<div className={'music-player-main-song-info'}>
					<p className={'song-title'}>{currentSong().title}</p>
					<p className={'song-author'}>{currentSong().author}</p>
				</div>
				<div className={'music-player-main-song-duration'}>
					<div className={'duration-box'}>
						<p>0:00</p>
						<p>{currentSong().duration}</p>
					</div>
					<div className={'duration-bar'}>
						<div className={'duration-bar-bg'}>
							<div className={'duration-bar-circle'}/>
						</div>
					</div>
				</div>
			</div>
			<div className={'music-player-bottom'}>
				<div className={'music-player-bottom-buttons'}>
					<button onClick={goPreviousSong}><i className="bx bx-rewind"/></button>
					<button>
						<i className="bx bx-play"/></button>
					<button onClick={goNextSong}><i className="bx bx-fast-forward"/></button>
				</div>
			</div>
		</div>;
	};

	const renderEmptyMusicPlayer = () => {
		return <div className={'music-player'}>
			<div className={'music-player-top'}>
				<button><i className="bx bxs-heart"/></button>
				<button onClick={() => history.push('/songs-list')}><i className="bx bx-menu"/></button>
			</div>
			<div className={'music-player-main'}>
				<div className={'music-player-main-song-cover'}/>
				<div className={'music-player-main-song-info'}>
					<p className={'song-title'}></p>
					<p className={'song-author'}></p>
				</div>
				<div className={'music-player-main-song-duration'}>
					<div className={'duration-box'}>
						<p></p>
						<p></p>
					</div>
					<div className={'duration-bar'}>
						<div className={'duration-bar-bg'}>
							<div className={'duration-bar-circle'}/>
						</div>
					</div>
				</div>
			</div>
			<div className={'music-player-bottom'}>
				<div className={'music-player-bottom-buttons'}>
					<button><i className="bx bx-rewind"/></button>
					<button><i className="bx bx-play"/></button>
					<button><i className="bx bx-fast-forward"/></button>
				</div>
			</div>
		</div>;
	};


	return (
		songs.length > 0 ? renderMusicPlayer() : renderEmptyMusicPlayer()
	)
		;
};

export default MusicPlayer;