import axios from 'axios';

// const key = process.env.API_KEY; not working at this time
const key = "AIzaSyBkF4I7wvxP0cDblptFjgGzr3Reaexoy50";


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