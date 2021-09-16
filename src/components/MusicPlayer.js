import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MusicPlayer = () => {
	const history = useHistory();
	const songs = useSelector(state => state.songs.songs);
	return (
		<div className={'music-player'}>
			<div className={'music-player-top'}>
				<button><i className="bx bxs-left-arrow-alt"/></button>
				<p>PLAYING NOW</p>
				<button onClick={() => history.push('/songs-list')}><i className="bx bx-menu"/></button>
			</div>
			<div className={'music-player-main'}>
				<div className={'music-player-main-song-cover'} style={{ backgroundImage: `url(${songs[0].coverUrl})` }}/>
				<div className={'music-player-main-song-info'}>
					<p className={'song-title'}>{songs[0].title}</p>
					<p className={'song-author'}>{songs[0].author}</p>
				</div>
				<div className={'music-player-main-song-duration'}>
					<div className={'duration-box'}>
						<p>0:00</p>
						<p>{songs[0].duration}</p>
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
		</div>
	);
};

export default MusicPlayer;