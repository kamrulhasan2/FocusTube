import { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import usePlaylists from "./hooks/usePlalists";
import { Button, Container, Grid } from "@mui/material";
import Navbar from "./components/navbar";
import PlaylistCardItem from "./components/playlist-card-item";


const App = () => {

  const {getPlaylistById, playlists,error} = usePlaylists();

  const playlistArray = Object.values(playlists);

  if(error){
    console.log('Error: ', error);
  }

  return (
    <>
    <CssBaseline />
      <Container maxWidth="lg">
        <Navbar getPlaylistById={getPlaylistById} />
        
        {
          playlistArray.length > 0 &&(
            <Grid container alignItems={'stretch'}>
              {
                playlistArray.map((item)=>(
                  <Grid item xs={12} md={6} lg={4} mb={2}>
                    <PlaylistCardItem 
                      key={item.id}
                      playlistThumbnail={item.playlistThumbnail}
                      playlistTitle={item.playlistTitle}
                      channelTitle={item.channelTitle}
                    />
                  </Grid>
                ))
              }
            </Grid>
          )
        }

      </Container>
    </>
  )
}

export default App;