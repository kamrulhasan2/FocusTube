import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from '../store';
import DistractionFreePlayer from '../components/DistractionFreePlayer';
import VideoList from '../components/VideoList';
import { Typography, Container, CircularProgress, Alert, Box, Button, IconButton }
  from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RefreshIcon from '@mui/icons-material/Refresh';

const PlaylistViewerPage = () => { 
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists, isLoading, error, favorites, lastWatchedPlaylistId } = useStoreState((state) => state.app);
  const { loadPlaylist, setLastWatched, toggleFavoritePlaylist, refreshPlaylist } = useStoreActions((actions) => actions.app);

  const currentPlaylist = playlistId ? playlists.find(p => p.id === playlistId) : undefined;
  const [currentVideoId, setCurrentVideoId] = useState(null);

  useEffect(() => {
    if (playlistId) {
      if (!currentPlaylist || lastWatchedPlaylistId !== playlistId) {
        loadPlaylist(playlistId);
      }
      setLastWatched(playlistId);
    } else {
      navigate('/');
    }
  }, [playlistId, loadPlaylist, setLastWatched, navigate, currentPlaylist, lastWatchedPlaylistId]);

  useEffect(() => {
    if (currentPlaylist && currentPlaylist.videos.length > 0 && !currentVideoId) {
      setCurrentVideoId(currentPlaylist.videos[0].id);
    }
  }, [currentPlaylist, currentVideoId]);

  const handleSelectVideo = (videoId) => {
    setCurrentVideoId(videoId);
  };

  const handleNextVideo = () => {
    if (currentPlaylist && currentVideoId) {
      const currentIndex = currentPlaylist.videos.findIndex(v => v.id === currentVideoId);
      if (currentIndex !== -1 && currentIndex < currentPlaylist.videos.length - 1) {
        setCurrentVideoId(currentPlaylist.videos[currentIndex + 1].id);
      }
    }
  };

   const handlePreviousVideo = () => {
     if (currentPlaylist && currentVideoId) {
      const currentIndex = currentPlaylist.videos.findIndex(v => v.id === currentVideoId);
      if (currentIndex > 0) {
        setCurrentVideoId(currentPlaylist.videos[currentIndex - 1].id);
      }
    }
  };

  const handleToggleFavorite = () => {
    if (playlistId) toggleFavoritePlaylist(playlistId);
  };

  const handleRefresh = () => {
    if (playlistId) refreshPlaylist(playlistId);
  }

  if (isLoading && !currentPlaylist) return <Container sx={{ textAlign: 'center', py:5 }}><CircularProgress /></Container>;
  if (error && !currentPlaylist) return <Container sx={{ textAlign: 'center', py:5 }}><Alert severity="error">{error}</Alert></Container>;
  if (!currentPlaylist) return <Container sx={{ textAlign: 'center', py:5 }}><Typography>Playlist not found.</Typography></Container>;

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
            <DistractionFreePlayer
              videoId={currentVideoId}
              onNext={handleNextVideo}
              onPrevious={handlePreviousVideo}
              onEnded={handleNextVideo} // Autoplay next video
            />
          )}
        </Box>
        <Box sx={{ width: { xs: '100%', md: '350px' }, height: '100%', overflowY: 'auto' }}>
          <VideoList
            videos={currentPlaylist.videos}
            currentVideoId={currentVideoId}
            onSelectVideo={handleSelectVideo}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PlaylistViewerPage;