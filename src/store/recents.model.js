import { action, persist } from "easy-peasy";

const recentsModel = persist({
    items: [],
    addToRecent: action((state,playlistId)=>{
        state.items.unshift(playlistId);
        state.items.slice(0,5);
    }),
});

export default recentsModel;