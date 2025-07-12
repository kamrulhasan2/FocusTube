import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const PlaylistCard = ({ playlist, onRemove, onPlaylistClick }) => {
  const handleClick = () => {
    if (onPlaylistClick) {
      onPlaylistClick(playlist.id);
    }
  };

  const playListTitle = `${playlist.title.slice(0, 50)}${playlist.title.length > 50 ? '...' : ''}`;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1 }}>
      <Link to={`/playlist/${playlist.id}`} onClick={handleClick}>
        <CardMedia
          component="img"
          sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }}
          image={playlist.videos[0]?.thumbnailUrl}
          alt={playlist.title}
        />
      </Link>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" component={Link} to={`/playlist/${playlist.id}`} onClick={handleClick} sx={{ textDecoration: 'none', color: 'inherit', fontSize: { xs: '0.75rem', md: '1.25rem' } }}>
          {playListTitle || 'Untitled Playlist'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', md: '0.875rem' } }}>
          {playlist.channelTitle || 'Unknown Channel'}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => onRemove(playlist.id)}
        sx={{ ml: 2 }}
      >
        Remove
      </Button>
    </Card>
  );
};

export default PlaylistCard;