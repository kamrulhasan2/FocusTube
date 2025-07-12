import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, Button } from '@mui/material';
import { useStoreState, useStoreActions } from '../store';
import PlaylistCard from '../components/PlaylistCard';

const FavoritesPage = () => {
  const { playlists, favorites } = useStoreState((state) => state.app);
  const { toggleFavoritePlaylist, setLastWatched } = useStoreActions((actions) => actions.app);

  const favoritePlaylists = playlists.filter(p => favorites.includes(p.id));

  if (!favoritePlaylists || favoritePlaylists.length === 0) {
    return (
      <Container sx={{ py: 7, paddingBlockEnd: '180px', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>No Favorite Playlists</Typography>
        <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
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
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Favorite Playlists
      </Typography>
      <List>
        {favoritePlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onRemove={toggleFavoritePlaylist}
            onPlaylistClick={setLastWatched}
          />
        ))}
      </List>
    </Container>
  );
};

export default FavoritesPage;
