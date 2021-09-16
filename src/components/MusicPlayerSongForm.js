import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSong } from '../state/songsSlice';

const MusicPlayerSongForm = () => {
	const [title, setTitle] = useState('');
	const [duration, setDuration] = useState('');
	const [author, setAuthor] = useState('');
	const [album, setAlbum] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [audioUrl, setAudioUrl] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const handleTitleInput = (e) => {
		setTitle(e.target.value);
	};

	const handleDurationInput = (e) => {
		setDuration(e.target.value);
	};

	const handleAuthorInput = (e) => {
		setAuthor(e.target.value);
	};

	const handleCoverUrlInput = (e) => {
		setCoverUrl(e.target.value);
	};
	const handleAudioUrlInput = (e) => {
		setAudioUrl(e.target.value);
	};
	const handleAlbumInput = (e) => {
		setAlbum(e.target.value);
	};

	const addNewSong = () => {
		const durationRegex = /^[0-9]{2}:[0-9]{2}$/;
		if (title === '') {
			alert('Enter a title!');
			return;
		}
		if (duration === '' || !durationRegex.test(duration)) {
			alert('Enter valid duration!');
			return;
		}
		if (author === '') {
			alert('Enter a author!');
			return;
		}

		if (coverUrl === '') {
			alert('Enter a cover url!');
			return;
		}
		if (audioUrl === '') {
			alert('Enter an audio url!');
			return;
		}
		dispatch(setSong({
			title,
			duration,
			author,
			album,
			coverUrl,
			audioUrl
		}));
		history.push('/');
	};


	return (
		<div className={'music-player-song-form'}>
			<div className={'music-player-song-form-top'}>
				<button onClick={() => history.push('/songs-list')}><i className="bx bxs-left-arrow-alt"/></button>

			</div>
			<div className={'music-player-song-form-main'}>
				<div className={'music-player-song-form-main-inputs'}>
					<div className={'music-player-song-form-main-inputs-input-box'}>
						<label>Song's title</label>
						<input value={title} onChange={handleTitleInput}/>
					</div>
					<div className={'music-player-song-form-main-inputs-input-box'}>
						<label>Song's duration</label>
						<input placeholder={'00:00'} value={duration} onChange={handleDurationInput}/>
					</div>
					<div className={'music-player-song-form-main-inputs-input-box'}>
						<label>Song's album</label>
						<input value={album} onChange={handleAlbumInput}/>
					</div>
					<div className={'music-player-song-form-main-inputs-input-box'}>
						<label>Song's author</label>
						<input value={author} onChange={handleAuthorInput}/>
					</div>
					<div className={'music-player-song-form-main-inputs-input-box'}>
						<label>Song's cover url</label>
						<input value={coverUrl} onChange={handleCoverUrlInput}/>
					</div>
					<div className={'music-player-song-form-main-inputs-input-box'}>
						<label>Song's audio url</label>
						<input value={audioUrl} onChange={handleAudioUrlInput}/>
					</div>
				</div>
				<button onClick={addNewSong}>Add song</button>
			</div>
		</div>
	);
};

export default MusicPlayerSongForm;