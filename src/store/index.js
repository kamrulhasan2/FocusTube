import { createStore } from 'easy-peasy'
import playlistModel from './playlist.model';
import favoritesModel from './favorites.model';
import recentsModel from './recents.model';


const store = createStore({
    playlists: playlistModel,
    favorites: favoritesModel,
    recents: recentsModel,
});

export default store;