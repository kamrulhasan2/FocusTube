import React from 'react';
import YouTube from 'react-youtube';
import { Box } from '@mui/material';


const DistractionFreePlayer = ({ videoId, onNext, onPrevious, onEnded }) => { 
  const playerOpts = { // No YouTubeProps['opts'] needed
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  const onPlayerReady = (event) => {
    // event.target.pauseVideo();
  }

  return (
    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
      <YouTube
        videoId={videoId}
        opts={playerOpts}
        onReady={onPlayerReady}
        onEnd={onEnded}
        iframeClassName="absolute top-0 left-0 w-full h-full"
      />

    </Box>
  );
};

export default DistractionFreePlayer;