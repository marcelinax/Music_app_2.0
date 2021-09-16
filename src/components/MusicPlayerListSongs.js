import React from 'react';
import { useHistory } from 'react-router-dom';

const MusicPlayerListSongs = () => {
	const history = useHistory();
	return (
		<div className={'music-player-list-songs'}>
			<div className={'music-player-list-songs-top'}>
				<button onClick={() => history.push('/')}><i className="bx bxs-left-arrow-alt"/></button>
				<p>PLAYING NOW</p>
				<button onClick={() => history.push('/add-song')}><i className="bx bx-plus"/></button>
			</div>
		</div>
	);
};

export default MusicPlayerListSongs;