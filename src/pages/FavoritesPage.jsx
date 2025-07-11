import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, Button } from '@mui/material';
import { useStoreState, useStoreActions } from '../store';
import PlaylistCard from '../components/PlaylistCard';

const FavoritesPage = () => {
  const { playlists, favorites } = useStoreState((state) => state.app);
  const { toggleFavoritePlaylist } = useStoreActions((actions) => actions.app);

  const favoritePlaylists = playlists.filter(p => favorites.includes(p.id));

  if (!favoritePlaylists || favoritePlaylists.length === 0) {
    return (
      <Container sx={{ py: 7, paddingBlockEnd: '180px', textAlign: 'center' }}>
        <Typography variant="h5">No Favorite Playlists</Typography>
        <Typography>
          Mark some playlists as favorites to see them here.
        </Typography>
        <Button sx={{ m: 5 }} variant="contained" component={Link} to="/">
          Go to Homepage
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Playlists
      </Typography>
      <List>
        {favoritePlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onRemove={toggleFavoritePlaylist}
          />
        ))}
      </List>
    </Container>
  );
};

export default FavoritesPage;
