import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeSong, setCurrentSongIdentifier } from '../state/songsSlice';

const MusicPlayer = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const songs = useSelector(state => state.songs.songs);
	const [isPlayed, setIsPlayed] = useState(false);
	const audioRef = useRef();
	const currentSongIdentifier = useSelector(state => state.songs.currentSongId);

	const [currentSongId, setCurrentSongId] = useState(currentSongIdentifier);
	let [currentDuration, setCurrentDuration] = useState(0);
	const [timeoutState, setTimeoutState] = useState(0);

	const getCurrentSongIndex = () => {
		return songs.map(song => song.id).indexOf(currentSongId);
	};

	const currentSong = () => {
		return songs[getCurrentSongIndex()];
	};

	const goNextSong = () => {
		clearInterval(timeoutState);
		const songIndex = getCurrentSongIndex();
		if (songIndex >= songs.length - 1) setCurrentSongId(songs[0].id);
		else setCurrentSongId(songs[songIndex + 1].id);
	};

	const goPreviousSong = () => {
		clearInterval(timeoutState);
		const songIndex = getCurrentSongIndex();
		if (songIndex <= 0) setCurrentSongId(songs[songs.length - 1].id);
		else setCurrentSongId(songs[songIndex - 1].id);
	};

	const continuePlayingIfPlayed = () => {
		if (isPlayed) {
			audioRef.current.play();
		}
	};


	const togglePlaySong = () => {
		if (isPlayed) {
			audioRef.current.pause();
			setIsPlayed(false);
			clearInterval(timeoutState);
		} else {
			audioRef.current.play();
			setIsPlayed(true);
			setTimeoutState(setInterval(() => {
				setCurrentDuration(currentDuration++);
			}, 10));
		}
	};

	const updateDuration = () => {
		if (isPlayed)
			setTimeoutState(setInterval(() => {
				setCurrentDuration(currentDuration++);
			}, 10));
	};


	useEffect(() => {
		if (currentDuration >= getSongDurationInSeconds()) {
			goNextSong();
		}
		if (currentDuration === 0 && isPlayed) {
			updateDuration();
		}
	}, [currentDuration]);

	useEffect(() => {
		continuePlayingIfPlayed();
	}, [currentSongId]);

	useEffect(() => {
		if (timeoutState && !isPlayed)
			clearInterval(timeoutState);
	}, [currentSongId, isPlayed]);

	useEffect(() => {
		if (isPlayed) {
			setCurrentDuration(currentDuration + 0.1);
		}
	}, [isPlayed]);

	useEffect(() => {
		if (!isPlayed) setCurrentDuration(0.1);
		else setCurrentDuration(0);
	}, [currentSongId]);

	useEffect(() => {
		dispatch(setCurrentSongIdentifier({ id: currentSongId }));
	}, [currentSongId]);

	const getSongDurationInSeconds = () => {
		return (+currentSong().duration.split(':')[0] * 60 + +currentSong().duration.split(':')[1]) * 100;
	};

	const parseDuration = () => {
		const minutes = Math.floor(currentDuration / 100 / 60);
		const seconds = Math.floor(currentDuration / 100 % 60);
		return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
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
				<div className={'music-player-main-song-cover'}
						 style={{ backgroundImage: `url(${currentSong().coverUrl})`, transform: `rotate(${Math.floor(currentDuration) / 3}deg)` }}/>
				<div className={'music-player-main-song-info'}>
					<p className={'song-title'}>{currentSong().title}</p>
					<p className={'song-author'}>{currentSong().author}</p>
				</div>
				<div className={'music-player-main-song-duration'}>
					<div className={'duration-box'}>
						<p>{parseDuration()}</p>
						<p>{currentSong().duration}</p>
					</div>
					<div className={'duration-bar'}>
						<div className={'duration-bar-bg'} style={{ width: currentDuration / getSongDurationInSeconds() * 100 + '%' }}/>
						<div className={'duration-bar-circle'} style={{ left: currentDuration / getSongDurationInSeconds() * 100 + '%' }}/>
					</div>
				</div>
			</div>
			<div className={'music-player-bottom'}>
				<div className={'music-player-bottom-buttons'}>
					<button onClick={goPreviousSong}><i className="bx bx-rewind"/></button>
					<button onClick={() => {
						togglePlaySong();
					}} className={isPlayed ? 'btn--active' : ''}>
						<audio src={currentSong().audioUrl} ref={audioRef}/>
						<i className={isPlayed ? 'bx bx-pause' : 'bx bx-play'}/></button>
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