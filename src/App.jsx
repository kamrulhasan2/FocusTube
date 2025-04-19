import { useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import usePlaylists from "./hooks/usePlalists";
import { Button } from "@mui/material";
import Navbar from "./components/navbar";

const App = () => {

  const {getPlaylistById, playlists,error} = usePlaylists();

  useEffect(() => {
    getPlaylistById("PLHiZ4m8vCp9M6HVQv7a36cp8LKzyHIePr");
  }, [])

  console.log(playlists);

  if(error){
    console.log('Error: ', error);
  }

  return (
    <>
    <CssBaseline />
      <div>
        <Navbar />
        <h1>Hello World</h1>
        <Button variant="contained">Hello</Button>
      </div>
    </>
  )
}

export default App;