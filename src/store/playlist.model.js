import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
    item: [],
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    channelId: '',
    channelTitle: '',
    setPlaylistData: action((state, payload) => {
        state = {...payload};
        return state;
    }),
    getPlaylistData: thunk(async (actions, payload) => {
        const {
            playlistId,
            playlistItems,
            playlistTitle,
            playlistDescription,
            playlistThumbnail,
            channelId,
            channelTitle

        } = await getPlayList(payload);

        actions.setPlaylistData({
            item: playlistItems,
            id: playlistId,
            title: playlistTitle,
            description: playlistDescription,
            thumbnail: playlistThumbnail,
            channelId,
            channelTitle
        });
    }),

});

export default playlistModel;
