import React from 'react';

const MusicPlayerListSongsItem = ({ title, author, album }) => {
	return (
		<div className={'music-player-list-songs-item'}>
			<div className={'music-player-list-songs-item-info'}>
				<p className={'song-title'}>{title}</p>
				<p className={'song-author'}>{album.length > 0 ? album : title} • {author}</p>
			</div>
			<div className={'music-player-list-songs-item-buttons'}>
				<button><i className="bx bx-play"/></button>
				<button><i className="bx bxs-trash-alt"/></button>
			</div>
		</div>
	);
};

export default MusicPlayerListSongsItem;