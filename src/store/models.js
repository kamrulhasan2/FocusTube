import { action, thunk, persist } from 'easy-peasy';
import { fetchPlaylistFromApi ,mockFetchPlaylistFromApi } from '../hooks/useYouTubeApi'; 


export const playlistsModel = persist(
  {
    playlists: [],
    favorites: [], // Array of playlist IDs
    lastWatchedPlaylistId: null,
    isLoading: false,
    error: null,

    // Actions
    setLoading: action((state, payload) => {
      state.isLoading = payload;
    }),
    setError: action((state, payload) => {
      state.error = payload;
    }),
    addPlaylistData: action((state, playlistData) => {
      const existingIndex = state.playlists.findIndex(p => p.id === playlistData.id);
      if (existingIndex > -1) {
        state.playlists[existingIndex] = { ...playlistData, lastUpdated: Date.now() };
      } else {
        state.playlists.push({ ...playlistData, lastUpdated: Date.now() });
      }
      state.error = null;
    }),
    removePlaylistData: action((state, playlistId) => {
      state.playlists = state.playlists.filter(p => p.id !== playlistId);
      state.favorites = state.favorites.filter(id => id !== playlistId);
      if (state.lastWatchedPlaylistId === playlistId) {
        state.lastWatchedPlaylistId = null;
      }
    }),
    toggleFavoritePlaylist: action((state, playlistId) => {
      const index = state.favorites.indexOf(playlistId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        if (state.playlists.find(p => p.id === playlistId)) {
          state.favorites.push(playlistId);
        }
      }
    }),
    setLastWatched: action((state, playlistId) => {
      state.lastWatchedPlaylistId = playlistId;
    }),

    // // Thunks
   loadPlaylist: thunk(async (actions, playlistId, { getState }) => {
      actions.setLoading(true);
      actions.setError(null);
      const existingPlaylist = getState().playlists.find(p => p.id === playlistId);

      // Cache check logic (this is fine)
      if (existingPlaylist && !getState().isLoading) { // Ensure not already loading
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        // If not older than 24 hours and not forcing refresh, use cache
        if (existingPlaylist.lastUpdated && (now - existingPlaylist.lastUpdated < twentyFourHours)) {
          console.log("Loading from cache/store (within 24h):", playlistId);
          actions.setLastWatched(playlistId); // Make sure to set last watched even from cache
          actions.setLoading(false);
          return existingPlaylist;
        }
        // If older than 24 hours, it will proceed to fetch, which is correct for refresh.
        // For an initial load of an old cached item, you might still want to fetch if you want it always "fresh"
        // or decide if the cached version is okay. Current logic will re-fetch if >24h.
      }

      try {
        console.log("Attempting to load playlist with ID (REAL API):", playlistId);

        // ***** THIS IS THE CRITICAL LINE *****
        const playlistData = await fetchPlaylistFromApi(playlistId); // <--- ENSURE THIS IS NOT mockFetchPlaylistFromApi
        // const playlistData = await mockFetchPlaylistFromApi(playlistId); // <--- THIS WOULD BE THE MOCK CALL

        if (playlistData) {
          actions.addPlaylistData(playlistData);
        } else {
          actions.setError(`Playlist with ID ${playlistId} not found or API error.`);
        }
      } catch (err) {
        console.error("Error in loadPlaylist thunk:", err);
        actions.setError(err.message || 'Failed to load playlist');
      } finally {
        actions.setLoading(false);
      }
    }),




    refreshPlaylist: thunk(async (actions, playlistId, { getState }) => {
      const playlist = getState().playlists.find(p => p.id === playlistId);
      if (!playlist) {
        actions.setError("Playlist not found for refresh.");
        return;
      }
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (playlist.lastUpdated && (now - playlist.lastUpdated < twentyFourHours)) {
        actions.setError("Playlist can only be refreshed once every 24 hours.");
        alert("Playlist can only be refreshed once every 24 hours.");
        return;
      }

      actions.setLoading(true);
      try {
        const playlistData = await mockFetchPlaylistFromApi(playlistId, true); // Mocked, force refresh
        if (playlistData) {
          actions.addPlaylistData(playlistData);
        } else {
          actions.setError(`Playlist with ID ${playlistId} not found or API error during refresh.`);
        }
      } catch (err) {
        actions.setError(err.message || 'Failed to refresh playlist');
      } finally {
        actions.setLoading(false);
      }
    }),
    initializeStore: thunk((actions) => {
      // console.log("Store initialized by easy-peasy persist.");
    }),
  },
  {
    storage: 'localStorage',
  }
);