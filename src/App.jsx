import { useEffect } from "react";
import getPlayList from "./api";

const App = () => {

  useEffect(() => {
    getPlayList(`PLHiZ4m8vCp9M6HVQv7a36cp8LKzyHIePr`, "", []).then((res) => {
      console.log(res);
    });
  }, [])

  return (
    <div>
      helllo
    </div>
  )
}

export default App;