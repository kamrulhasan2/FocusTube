import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { extractPlaylistId } from '../utils/extractLinksUtils';

const schema = yup.object().shape({
  playlistInput: yup.string().required('Playlist Link or ID is required'),
});

const PlaylistForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm({
    resolver: yupResolver(schema),
  });
  // const loadPlaylist = useStoreActions((actions) => actions.app.loadPlaylist); // Not directly calling here
  const [alertMessage, setAlertMessage] = React.useState(null);

  const onSubmit = async (data) => { // data is IFormInput
    setAlertMessage(null);
    const playlistId = extractPlaylistId(data.playlistInput);

    if (!playlistId) {
      setFormError('playlistInput', { type: 'manual', message: 'Invalid YouTube Playlist Link or ID' });
      setAlertMessage('Please enter a valid YouTube Playlist Link or ID.');
      return;
    }

    try {
      // The PlaylistViewerPage will handle loading the playlist via its own useEffect
      navigate(`/playlist/${playlistId}`);
    } catch (error) {
      setAlertMessage(error.message || 'Failed to process playlist.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%', maxWidth: '500px' }}>
      {alertMessage && <Alert severity="info" sx={{ mb: 2 }}>{alertMessage}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="playlistInput"
        label="YouTube Playlist Link or ID"
        autoFocus
        {...register('playlistInput')}
        error={!!errors.playlistInput}
        helperText={errors.playlistInput?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Load Playlist
      </Button>
    </Box>
  );
};

export default PlaylistForm;