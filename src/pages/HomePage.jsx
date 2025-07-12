import PlaylistForm from '../components/PlaylistForm';
import { Typography, Container, Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStoreState } from '../store';


const HomePage = () => { 
  const lastWatched = useStoreState(state => state.app.lastWatchedPlaylistId);
  const playlists = useStoreState(state => state.app.playlists);
  const lastWatchedPlaylist = lastWatched ? playlists.find(p => p.id === lastWatched) : null;

  return (
    <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }}>
        FocusTube
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
        Your distraction-free YouTube course viewer.
      </Typography>

      <PlaylistForm />

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
        {lastWatchedPlaylist && (
          <Typography variant="h6" sx={{ mb: 2 ,color: 'text.secondary' , fontWeight: 'bold', fontSize: { xs: '1.1rem', md: '1.25rem' }}}>
            <span >--Last watched playlist-- </span><br />
            <Link to={`/playlist/${lastWatchedPlaylist.id}`}>{lastWatchedPlaylist.title}</Link><br />
            <Button variant="contained" color="warning" sx={{ my: 2 }} component={Link} to={`/playlist/${lastWatchedPlaylist.id}`}>Continue Watching</Button>
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: { xs: '100%', md: 400 }, margin: '0 auto' }}>
           <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                <Button component={Link} to="/saved" variant="outlined" color="primary">Saved Playlists</Button>
                <Button component={Link} to="/favorites" variant="outlined" color="primary">Favorites</Button>
            </ButtonGroup>
         </Box>
      </Box>
    </Container>
  );
};

export default HomePage;