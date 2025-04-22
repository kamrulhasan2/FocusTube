import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import usePlaylists from "./hooks/usePlalists";
import { Button, Container, Grid } from "@mui/material";
import Navbar from "./components/navbar";
import PlaylistCardItem from "./components/playlist-card-item";


// Create a Homepage component for testing purposes

const Homepage = ({playlistArray})=> {
  return(
    <Container maxWidth="lg">
            
    {
      playlistArray.length > 0 &&(
        <Grid container alignItems={'stretch'}>
          {
            playlistArray.map((item)=>(
              <Grid item xs={12} md={6} lg={4} mb={2}>
                <PlaylistCardItem 
                  key={item.playlistId}
                  playlistId={item.playlistId}
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
  )
}




const App = () => {

  const {getPlaylistById, playlists,error} = usePlaylists();

  const playlistArray = Object.values(playlists);

  if(error){
    console.log('Error: ', error);
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar getPlaylistById={getPlaylistById} />

      <Routes>
        <Route path="/" element={<Homepage playlistArray={playlistArray} />} />
      </Routes>

     
    </BrowserRouter>
  )
}

export default App;