
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


// // Mock data for development without API key
const mockPlaylists = {
  'PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC': {
    id: 'PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC',
    title: 'Example Playlist (Mock)',
    channelTitle: 'Example Channel (Mock)',
    videos: [
      { id: '5Xy-t8k_M4A', title: 'React Tutorial 1', thumbnailUrl: 'https://i.ytimg.com/vi/SqcY0GlETPk/mqdefault.jpg' },
      { id: '2C5834qx0sA', title: 'React Tutorial 2', thumbnailUrl: 'https://i.ytimg.com/vi/N3AkSS5hXMA/mqdefault.jpg' },
    ],
  },
  
};

export async function mockFetchPlaylistFromApi(playlistId, forceRefresh = false) {
  console.log(`Mock fetching playlist: ${playlistId}, Force refresh: ${forceRefresh}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockPlaylists[playlistId]) { // This condition will now be true for your ID
        resolve({ ...mockPlaylists[playlistId], lastUpdated: Date.now() });
      } else {
        // This 'else' block is what was being hit before, causing the error message
        console.error(`Mock playlist with ID ${playlistId} NOT FOUND in mockPlaylists object.`);
        resolve(null);
      }
    }, 100); // Simulate network delay
  });
}



// --- REAL API IMPLEMENTATION (Example - Needs API Key) ---
export async function fetchPlaylistFromApi(playlistId) {
  if (!API_KEY || API_KEY.trim() === '') {
    console.warn("YouTube API Key not configured. Using mock data.");
    
  }

  try {
    
    const playlistDetailsResponse = await fetch(
      `${BASE_URL}/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`
    );
    if (!playlistDetailsResponse.ok) throw new Error(`Failed to fetch playlist details: ${playlistDetailsResponse.status}`);
    const playlistDetailsData = await playlistDetailsResponse.json();

    if (!playlistDetailsData.items || playlistDetailsData.items.length === 0) {
      return null;
    }
    const playlistSnippet = playlistDetailsData.items[0].snippet;

    let videos = [];
    let nextPageToken = undefined;
    do {
      const playlistItemsResponse = await fetch(
        `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${
          nextPageToken ? `&pageToken=${nextPageToken}` : ''
        }&key=${API_KEY}`
      );
      if (!playlistItemsResponse.ok) throw new Error(`Failed to fetch playlist items: ${playlistItemsResponse.status}`);
      const playlistItemsData = await playlistItemsResponse.json();

      videos = videos.concat(
        playlistItemsData.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
        }))
      );
      nextPageToken = playlistItemsData.nextPageToken;
    } while (nextPageToken);

    return {
      id: playlistId,
      title: playlistSnippet.title,
      channelTitle: playlistSnippet.channelTitle,
      videos,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching from YouTube API:", error);
    throw error;
  }
}