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
      <Typography variant="h3" component="h1" gutterBottom>
        FocusTube
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Your distraction-free YouTube course viewer.
      </Typography>

      <PlaylistForm />

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
        {lastWatchedPlaylist && (
          <Typography variant="h6" sx={{ mb: 2 ,color: 'text.secondary' , fontWeight: 'bold'}}>
            <span >--Last watched playlist-- </span><br />
            <Link to={`/playlist/${lastWatchedPlaylist.id}`}>{lastWatchedPlaylist.title}</Link><br />
            <Button variant="contained" color="warning" sx={{ my: 2 }} component={Link} to={`/playlist/${lastWatchedPlaylist.id}`}>Continue Watching</Button>
          </Typography>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: 400, margin: '0 auto' }}>
           <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button component={Link} to="/saved" variant="outlined" color="primary">Saved Playlists</Button>
                <Button component={Link} to="/favorites" variant="outlined" color="primary">Favorites</Button>
            </ButtonGroup>
        </div>
      </Box>
    </Container>
  );
};

export default HomePage;