import React, { useState, useRef,  useEffect } from 'react';
import YouTube from 'react-youtube';
import { Box, Typography, CircularProgress} from '@mui/material';


const DistractionFreePlayer = ({ videoId, onNext, onPrevious, onEnded }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [playerState, setPlayerState] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isActuallyFullscreen, setIsActuallyFullscreen] = useState(false);
  const playerRef = useRef(null); // To get a reference to the player instance
  const playerContainerRef = useRef(null);

  const playerOpts = {
    playerVars: {
      autoplay: 0,
      controls: 1, // Use YouTube's built-in controls
      modestbranding: 1,
      iv_load_policy: 3, // Hide annotations
      rel: 0, // Don't show related videos from other channels
      showinfo: 0, // Deprecated but included for good measure
      // To use custom controls, set controls: 0 and implement PlaybackControls
    },
  };


  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setIsPlayerReady(true);
    // You could try to play immediately if autoplay is desired and not working
    // event.target.playVideo();
  };

  const handlePlayerStateChange = (event) => {
    // Check if the player is in fullscreen mode
     if (document.fullscreenElement) { // If something is fullscreen (likely the player)
      setShowOverlay(false); // Don't show overlay when native fullscreen
      return;
    }

    setPlayerState(event.data); // Update our local player state
    if (event.data === window.YT.PlayerState.ENDED && onEnded) {
      onEnded();
    }


    if (event.data === window.YT.PlayerState.PAUSED) {
      setShowOverlay(true);
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setShowOverlay(true); // Also show overlay on end if you don't want YouTube's end screen
      if (onEnded) {
        onEnded(); // Call your onEnded prop for next video logic
      }
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      setShowOverlay(false);
    } else {
      // For other states like BUFFERING or CUED, you might want to keep overlay hidden or manage as needed
      setShowOverlay(false);
    }  
  };

   const handleOverlayClick = () => {
     if (playerRef.current && isPlayerReady) {
      const currentYTState = playerRef.current.getPlayerState();
      if (currentYTState === window.YT.PlayerState.PAUSED || currentYTState === window.YT.PlayerState.ENDED) {
        playerRef.current.playVideo();
      }
    }
  };

 useEffect(() => {
    const updateFullscreenStatus = () => {
      setIsActuallyFullscreen(!!document.fullscreenElement || !!document.webkitFullscreenElement || !!document.mozFullScreenElement || !!document.msFullscreenElement);
    };

    updateFullscreenStatus(); // Initial check

    document.addEventListener('fullscreenchange', updateFullscreenStatus);
    document.addEventListener('webkitfullscreenchange', updateFullscreenStatus); // Safari
    document.addEventListener('mozfullscreenchange', updateFullscreenStatus);    // Firefox
    document.addEventListener('MSFullscreenChange', updateFullscreenStatus);      // IE/Edge

    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreenStatus);
      document.removeEventListener('webkitfullscreenchange', updateFullscreenStatus);
      document.removeEventListener('mozfullscreenchange', updateFullscreenStatus);
      document.removeEventListener('MSFullscreenChange', updateFullscreenStatus);
    };
  }, []);

  const shouldShowOverlay = !isActuallyFullscreen && isPlayerReady &&
                           (playerState === window.YT.PlayerState.PAUSED ||
                            playerState === window.YT.PlayerState.ENDED);

  return (
    <Box sx={{ position: 'relative', height: '100%', backgroundColor: '#000' }}>
      {!isPlayerReady && ( // Optional: Show a loader until player is ready
        <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5
          }}
        >
          <CircularProgress color="inherit" sx={{color: 'white'}} />
        </Box>
      )}
      <YouTube
        videoId={videoId}
        opts={playerOpts}
        onReady={onPlayerReady}
        onStateChange={handlePlayerStateChange}
        // Do not use onEnd directly if onStateChange handles YT.PlayerState.ENDED
        iframeClassName="absolute top-0 left-0 w-full h-full"
        className="h-full"
        key={videoId} // Adding key helps React re-initialize if videoId changes drastically
      />
      {shouldShowOverlay && (
        <Box
          onClick={handleOverlayClick}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Slightly darker overlay
            display: 'flex',
            flexDirection: 'column', // To stack icon and text
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: 'white',
          }}
        >
          {/* <PlayArrowIcon sx={{ fontSize: '5rem', mb: 1 }} /> */}
          <Typography variant="h6">
            {playerState === window.YT.PlayerState.ENDED ? "Video Ended" : "Click to Play"}
          </Typography>
          <Typography variant="body2">Happy Learning!</Typography>
          <Typography variant="body2">--Kamrul Hasan--</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DistractionFreePlayer;
