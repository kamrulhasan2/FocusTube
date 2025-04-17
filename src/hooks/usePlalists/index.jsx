import { useState } from "react"
import getPlayList from "../../api";


const usePlaylists = () => {
    const [state, setState] = useState({
        playlists: {},
        recentPlaylist: [],
        favorites: [],
    });

    const [error, setError] = useState(" ");
    const [loading, setLoading] = useState(false);

    const getPlaylistById = async (playlistId, force = false) => {
        if (state.playlists[playlistId] && !force) {
            return;
        }


        let result;
        try{
            setLoading(true);
            result = await getPlayList(playlistId);
        }catch(err){
            setError(err.response?.data?.error?.message || 'Something went wrong');
        }finally{
            setLoading(false);
        }

        let cid,ct;

        result = result.map((item)=>{
            const {channelId,title,description,thumbnails: {medium}, channelTitle} = item.snippet;

            if(!cid){
                cid = channelId;
            }

            if(!ct){
                ct = channelTitle;
            }

            return {
                title,
                description,
                thumbnail: medium,
                contentDetails: item.contentDetails
            }
        });


        setState((prev)=>({
            ...prev,
            playlists: {
               ...prev.playlists,
               [playlistId]: {
                items: result,
                playlistId,
                channelId: cid,
                channelTitle: ct
               } 
            }
        }));

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