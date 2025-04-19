import { useState } from "react"
import getPlayList from "../../api";


const usePlaylists = () => {
    const [state, setState] = useState({
        playlists: {},
        recentPlaylist: [],
        favorites: [],
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getPlaylistById = async (playlistId, force = false) => {
        if (state.playlists[playlistId] && !force) {
            return;
        }
       

       try{
        setLoading(true);
        const playlist = await getPlayList(playlistId);
        console.log('playlist',playlist);
        setError('');
        setState((prev)=>({
            ...prev,
            playlists: {
                ...prev.playlists,
                [playlistId]: playlist,
            }
        }));
       }catch(err){
        console.error('error',err);
        setError(err.response?.data?.error?.message || "Something went wrong");
       }finally{
        setLoading(false);
       }
    };


    const addToFavorites = (playlistId) => {
        setState((prev) => ({
            ...prev,
            favorites: [...prev, playlistId]
        }));
    };

    const addToRecent = (playlistId) => {
        setState((prev) => ({
            ...prev,
            recentPlaylist: [...prev, playlistId]
        }));
    };


    const getPlaylistsByIds = (ids = []) => {
        return ids.map((id) => state.playlists[id]);
    };

    return {
        playlists: state.playlists,
        favorites: getPlaylistsByIds(state.favorites),
        recentPlaylists: getPlaylistsByIds(state.recentPlaylist),
        error,
        loading,
        getPlaylistById,
        addToFavorites,
        addToRecent
    };
};

export default usePlaylists;