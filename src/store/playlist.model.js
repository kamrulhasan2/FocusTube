import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
    data: {},
    error: '',
    isLoading: false,
    addPlaylist: action((state, payload) => {
       state.data[payload.playlistId] = payload;
    }),
    setLoading: action((state,payload)=>{
        state.isLoading = payload;
    }),
    setError: action((state,payload)=>{
        state.error = payload;
    }),
    getPlaylis: thunk(  // destructuring the (actions,payload,helper)
        async ({addPlaylist,setError,setLoading} , playlistId, {getState} ) => {
            //helper.getState() = When executed it will provide the state that is local to the thunk.
            if(getState().data[playlistId]){
                return;
            }
            setLoading(true);
            try {
                const playlist = await getPlayList(playlistId);
                addPlaylist(playlist);
            } catch (e) {
                setError(e.response?.data?.error?.message || "something went wrong");
            } finally{
                setLoading(false);
            }

    }),


});

export default playlistModel;
