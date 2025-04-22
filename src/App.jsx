import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import usePlaylists from "./hooks/usePlalists";
import { Button, Container, Grid, Typography } from "@mui/material";
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

// creating a NotFound component for testing purposes

const NotFound = () => {
  return(
    <Container maxWidth="lg">
      <Typography variant="h1" align="center" mt={5}>
        404 Not Found
      </Typography>
    </Container>
  )
}


// creating a PlayerPage component for testing purposes

const PlayerPage = ({playlists}) => {
  const {playlistId} = useParams();
  const currentPlaylist = playlists[playlistId];

  console.log(currentPlaylist);

  if(!currentPlaylist) return;

  return(
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" mt={5}>
        {currentPlaylist.playlistTitle}
      </Typography>

      <Typography variant="h4" align="center" mt={3}>
        <img src={currentPlaylist.playlistThumbnail.url} alt={currentPlaylist.playlistTitle} height={350} width={720}/>  
      </Typography>

      <Typography variant="body1" align="center" mt={3}>
        {currentPlaylist.playlistDescription}
      </Typography>
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
        <Route path="*" element={<NotFound />} />
        <Route path="/player/:playlistId" 
          element={<PlayerPage playlists={playlists} />} />
      </Routes>

     
    </BrowserRouter>
  )
}

export default App;