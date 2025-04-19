import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const PlaylistForm = ({open,handelClose,getPlaylistId}) => {
    const [state,setState] = useState('');

    const handelSubmit = () =>{
        //TODO: handle url later

        if(!state){
            alert('Please enter a playlist id or url');
            return;
        }else{
            getPlaylistId(state);
            setState('');
            handelClose();
        }
    }

  return (
    <>
      <Dialog
        open={open}
        onClose={handelClose}
      >
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new playlist please insert the playlist id or
            playlist link. Please make sure the link is correct.
            Otherwise we won't able to fetch the playlist information.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Enter playlist id or url"
            fullWidth
            variant="standard"
            onChange={(e)=>setState(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose}>Cancel</Button>
          <Button type="submit" onClick={handelSubmit}>Add Playlist</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default PlaylistForm;