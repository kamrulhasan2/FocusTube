import React, { useEffect, useState , useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from '../store';
import LazyPlayer from '../components/LazyPlayer';
import VideoList from '../components/VideoList';
import { Typography, Container, CircularProgress, Alert, Box, Button, IconButton }
  from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RefreshIcon from '@mui/icons-material/Refresh';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const PlaylistViewerPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  // State selectors - more granular to prevent unnecessary re-renders
  const { loadPlaylist, setLastWatched, toggleFavoritePlaylist, refreshPlaylist, updatePlaybackState } = useStoreActions((actions) => actions.app);
  const currentPlaylist = useStoreState((state) => state.app.playlists.find(p => p.id === playlistId));
  const isLoading = useStoreState((state) => state.app.isLoading);
  const error = useStoreState((state) => state.app.error);
  const favorites = useStoreState((state) => state.app.favorites);
  const playbackState = useStoreState((state) => state.app.playbackState);

  const playerRef = useRef(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [startSeconds, setStartSeconds] = useState(0);

  // Combined effect to manage loading and initial video selection
  useEffect(() => {
    console.log('PlaylistViewerPage: useEffect [playlistId, currentPlaylist, playbackState, currentVideoId]');
    console.log('  playlistId:', playlistId);
    console.log('  currentPlaylist:', currentPlaylist ? currentPlaylist.title : 'N/A');
    console.log('  currentVideoId (before logic):', currentVideoId);

    if (!playlistId) {
      navigate('/');
      return;
    }

    // If the playlist data isn't loaded yet, fetch it.
    if (!currentPlaylist) {
      console.log('  Loading playlist data...');
      loadPlaylist(playlistId);
      setLastWatched(playlistId);
    } 
    // If the playlist IS loaded but a video hasn't been chosen yet, choose one.
    else if (currentVideoId === null) { 
      console.log('  Playlist loaded, determining initial video...');
      const savedState = playbackState[playlistId];
      console.log('  Saved playbackState for current playlist:', savedState);

      if (savedState && savedState.videoId && currentPlaylist.videos.some(v => v.id === savedState.videoId)) {
        console.log('  Setting video from saved state:', savedState.videoId, 'at', savedState.timestamp);
        setCurrentVideoId(savedState.videoId);
        setStartSeconds(savedState.timestamp || 0);
      } else if (currentPlaylist.videos.length > 0) {
        console.log('  Setting video to first in playlist:', currentPlaylist.videos[0].id);
        setCurrentVideoId(currentPlaylist.videos[0].id);
        setStartSeconds(0);
      } else {
        console.log('  No videos in playlist or no valid saved state.');
      }
    }
    console.log('  currentVideoId (after logic):', currentVideoId);
  },[playlistId, currentPlaylist, loadPlaylist, setLastWatched, navigate, playbackState]);

  // Effect to save the playback state on unmount
  useEffect(() => {
    return () => {
      console.log('PlaylistViewerPage: Cleanup effect (saving playback state)');
      if (playerRef.current && playlistId && currentVideoId) {
        const timestamp = playerRef.current.getCurrentTime();
        console.log('  Saving state:', { playlistId, videoId: currentVideoId, timestamp });
        if (timestamp > 0) {
          updatePlaybackState({ playlistId, videoId: currentVideoId, timestamp });
        }
      }
    };
  }, [playlistId, currentVideoId, updatePlaybackState]);

  const handleSelectVideo = (videoId) => {
    console.log('handleSelectVideo called with:', videoId);
    if (currentVideoId !== videoId) {
        console.log('  Changing currentVideoId from', currentVideoId, 'to', videoId);
        setCurrentVideoId(videoId);
        setStartSeconds(0); // Always start new videos from the beginning
    }
  };

  const handleNextVideo = () => {
    if (currentPlaylist && currentVideoId) {
      const currentIndex = currentPlaylist.videos.findIndex(v => v.id === currentVideoId);
      if (currentIndex !== -1 && currentIndex < currentPlaylist.videos.length - 1) {
        handleSelectVideo(currentPlaylist.videos[currentIndex + 1].id);
      }
    }
  };

  const handlePreviousVideo = () => {
    if (currentPlaylist && currentVideoId) {
      const currentIndex = currentPlaylist.videos.findIndex(v => v.id === currentVideoId);
      if (currentIndex > 0) {
        handleSelectVideo(currentPlaylist.videos[currentIndex - 1].id);
      }
    }
  };

  const handleToggleFavorite = () => {
    if (playlistId) toggleFavoritePlaylist(playlistId);
  };

  const handleRefresh = () => {
    if (playlistId) refreshPlaylist(playlistId);
  }

  // This is the loading guard. It prevents rendering until the playlist and video are ready.
  if (isLoading || !currentPlaylist || !currentVideoId) {
    return <Container sx={{ textAlign: 'center', py: 5 }}><CircularProgress /></Container>;
  }

  // Error handling remains the same
  if (error && !currentPlaylist) return <Container sx={{ textAlign: 'center', py: 5 }}><Alert severity="error">{error}</Alert></Container>;
  if (!currentPlaylist) return <Container sx={{ textAlign: 'center', py: 5 }}><Typography>Playlist not found.</Typography></Container>;

  const isFavorite = playlistId ? favorites.includes(playlistId) : false;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1">{currentPlaylist.title}</Typography>
        <Box>
          <IconButton onClick={handleRefresh} aria-label="refresh playlist" title="Refresh Playlist (once/24h)">
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={handleToggleFavorite} aria-label="toggle favorite">
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </Box>
      {currentPlaylist.channelTitle && <Typography variant="subtitle1" color="text.secondary" gutterBottom>By: {currentPlaylist.channelTitle}</Typography>}
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, height: { md: '78vh' } }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {currentVideoId && (
            <LazyPlayer
              ref={playerRef}
              videoId={currentVideoId}
              onEnded={handleNextVideo}
              startSeconds={startSeconds}
            />
          )}
        </Box>
        <Box sx={{ width: { xs: '100%', md: '350px' }, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #ddd' }}>
            <Button onClick={handlePreviousVideo} startIcon={<SkipPreviousIcon />}>Previous</Button>
            <Button onClick={handleNextVideo} endIcon={<SkipNextIcon />}>Next</Button>
          </Box>
          <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
            <VideoList
              videos={currentPlaylist.videos}
              currentVideoId={currentVideoId}
              onSelectVideo={handleSelectVideo}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default PlaylistViewerPage;