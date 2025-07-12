import { Link } from 'react-router-dom';
import { Container, Typography, List,Button } from '@mui/material';
import { useStoreState, useStoreActions } from '../store';
import PlaylistCard from '../components/PlaylistCard';

const SavedPlaylistsPage = () => {
  const playlists = useStoreState((state) => state.app.playlists);
  const { removePlaylistData, setLastWatched } = useStoreActions((actions) => actions.app);

  if (!playlists || playlists.length === 0) {
    return (
      <Container sx={{ py: 7,paddingBlockEnd: '180px' , textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>No Saved Playlists</Typography>
        <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
           To Add some playlists.
        </Typography>

        <Button sx={{m:5}} variant="contained" component={Link} to="/">
            Go to Homepage
         </Button>

      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Saved Playlists
      </Typography>
      <List>
        {playlists.map((playlist) => (
            <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onRemove={removePlaylistData}
                onPlaylistClick={setLastWatched}
            />
            ))}
      </List>
    </Container>
  );
};

export default SavedPlaylistsPage;