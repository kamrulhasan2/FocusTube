import axios from 'axios';

const key = import.meta.env.VITE_API_KEY; // fixed



const getPlayList = async (playlistId, pageToken = " ", result = []) => {
    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}&pageToken=${pageToken}`;

    const {data} = await axios.get(URL);

    result = [...result, ...data.items];

    if(data.nextPageToken){
        result = getPlayList(playlistId, data.nextPageToken, result);
    }

    return result;

}

export default getPlayList;