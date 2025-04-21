import { useEffect, useState } from "react"
import getPlayList from "../../api";
import storage from "../../utils/Storage";

const storageKey = import.meta.env.VITE_STORAGE_KEY;

const INITIAL_STATE = {
    playlists: {},
    recentPlaylist: [],
    favorites: [],
}

const usePlaylists = () => {
    const [state, setState] = useState(INITIAL_STATE);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const state = storage.get(storageKey);
        if(state){
            setState({...state})
        }
    },[]);

    useEffect(()=>{
        if(state !== INITIAL_STATE){
           storage.save(storageKey, state);
        }
    },[state]);


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