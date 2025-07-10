import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const PlaylistCard = ({ playlist, onRemove }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1 }}>
      <Link to={`/playlist/${playlist.id}`}>
        <CardMedia
          component="img"
          sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }}
          image={playlist.videos[0]?.thumbnailUrl}
          alt={playlist.title}
        />
      </Link>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" component={Link} to={`/playlist/${playlist.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
          {playlist.title || 'Untitled Playlist'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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