import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/material';
import PlaylistForm from '../playlist-form';

const  Navbar = ({getPlaylistById}) => {
    const [open,setOpen] = useState(false);

    const handelClickOpen = () =>{
        setOpen(true);
    }

    const handelClose = () =>{
        setOpen(false);
    }

    const getPlaylistId = (playlistId)=>{
    //    getPlaylistById(playlistId); 
    console.log(playlistId);
    }



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ py: 2 }}>
        <Container maxWidth="lg">
            <Toolbar>
              <Stack  sx={{ flexGrow: 1 }}>
                <Typography variant="h5">
                    FocusTube
                </Typography>
                <Typography  variant="body1">
                    Learn without distractions
                </Typography>
              </Stack>
                <Button variant='contained' color="error" onClick={handelClickOpen}>Add To Playlist</Button>
                <PlaylistForm open={open} handelClose={handelClose} getPlaylistId={getPlaylistId}/> 
            </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;