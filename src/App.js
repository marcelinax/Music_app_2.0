import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MusicPlayer from './components/MusicPlayer';
import MusicPlayerSongForm from './components/MusicPlayerSongForm';
import MusicPlayerListSongs from './components/MusicPlayerListSongs';
import { useSelector } from 'react-redux';

function App() {
	const songs = useSelector(state => state.songs.songs);
	return (
		<BrowserRouter>
			<Switch>
				<Route path={'/'} exact>
					<MusicPlayer/>
				</Route>
				<Route path={'/add-song'}>
					<MusicPlayerSongForm/>
				</Route>
				<Route path={'/songs-list'}>
					<MusicPlayerListSongs/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
