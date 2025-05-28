export const extractPlaylistId = ( urlOrId) => {
    if(!urlOrId){
        return null;
    }

    const regex = /(?:list=)([\w-]+)/;
    const match = urlOrId.match(regex);

    if(match && match[1]){
        return match[1];
    }

    if(/^[\w-]+$/.test(urlOrId)){
        return urlOrId;
    }

    return null;
} 