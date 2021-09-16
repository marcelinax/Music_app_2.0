import React from 'react';

const MusicPlayer = () => {
	return (
		<div className={'music-player'}>
			<div className={'music-player-top'}>
				<button><i className="bx bxs-left-arrow-alt"/></button>
				<p>PLAYING NOW</p>
				<button><i className="bx bx-menu"/></button>
			</div>
			<div className={'music-player-main'}></div>
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