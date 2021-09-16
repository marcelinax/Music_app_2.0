import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
   <BrowserRouter>
     <Switch>
       <Route path={'/'} exact>
         <MusicPlayer/>
       </Route>
       <Route path={'/add-song'} exact>
         <MusicPlayer/>
       </Route>
     </Switch>
   </BrowserRouter>
  );
}

export default App;
