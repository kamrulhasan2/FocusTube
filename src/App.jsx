import { useEffect } from "react";
import usePlaylists from "./hooks/usePlalists";

const App = () => {

  const {getPlaylistById, playlists} = usePlaylists();

  useEffect(() => {
    getPlaylistById("PLHiZ4m8vCp9M6HVQv7a36cp8LKzyHIePr");
  }, [])

  console.log(playlists);

  return (
    <div>
      helllo
    </div>
  )
}

export default App;