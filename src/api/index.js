import axios from 'axios';

const key = import.meta.env.VITE_API_KEY; // fixed

const getPlaylistItem = async(playlistId, pageToken = " ", result = []) =>{
   try {
    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;
    const {data} = await axios.get(URL);
    result = [...result, ...data.items];
    if(data.nextPageToken){
        result = await getPlaylistItem(playlistId, data.nextPageToken, result);
    }
    
    return result;

   } catch (error) {
        console.error("Error fetching playlist items:", error);
        throw error;
   }
};

const getPlayList = async (playlistId) => {
    const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;
    const {data} = await axios.get(URL);
    if(!data.items?.length){
        throw new Error('Playlist not found');
    }
    let playlistItems = await getPlaylistItem(playlistId);

    const {
        title: playlistTitle,
        description: playlistDescription,
        thumbnails,
        channelId,
        channelTitle
    } = data?.items?.[0]?.snippet;

    playlistItems = playlistItems.map((item)=>{
        if (!item.snippet) {
            console.warn('Item without snippet found:', item);
            return null; 
        }

        const {
            title,
            description,
            thumbnails: {medium},
        } = item.snippet;

        return {
            title,
            description,
            thumbnail: medium,
            contentDetails: item.contentDetails
        }
    });
    

    return {
        playlistId,
        playlistTitle,
        playlistDescription,
        playlistThumbnail: thumbnails.default,
        playlistItems,
        channelId,
        channelTitle,
        playlistItems,
    };
 

};

export default getPlayList;