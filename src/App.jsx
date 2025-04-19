import { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import usePlaylists from "./hooks/usePlalists";
import { Button } from "@mui/material";
import Navbar from "./components/navbar";

const App = () => {

  const {getPlaylistById, playlists,error} = usePlaylists();

  if(error){
    console.log('Error: ', error);
  }

  return (
    <>
    <CssBaseline />
      <div>
        <Navbar getPlaylistById={getPlaylistById} />
      </div>
    </>
  )
}

export default App;