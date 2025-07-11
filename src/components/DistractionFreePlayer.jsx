import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import YouTube from 'react-youtube';
import { Box, Typography, CircularProgress } from '@mui/material';

const DistractionFreePlayer = forwardRef(({ videoId, onNext, onPrevious, onEnded, startSeconds }, ref) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [playerState, setPlayerState] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isActuallyFullscreen, setIsActuallyFullscreen] = useState(false);
  const playerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => {
      return playerRef.current ? playerRef.current.getCurrentTime() : 0;
    },
  }));

  // Define playerOpts inside the component to ensure it uses the latest startSeconds
  const playerOpts = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      iv_load_policy: 3,
      rel: 0,
      showinfo: 0,
      start: startSeconds || 0,
    },
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setIsPlayerReady(true);
  };

  const handlePlayerStateChange = (event) => {
    if (document.fullscreenElement) {
      setShowOverlay(false);
      return;
    }
    setPlayerState(event.data);

    if (event.data === window.YT.PlayerState.PLAYING) {
      setShowOverlay(false);
    }

    if (event.data === window.YT.PlayerState.PAUSED) {
      setShowOverlay(true);
    }

    if (event.data === window.YT.PlayerState.ENDED) {
      if (onEnded) onEnded();
      setShowOverlay(true);
    }
  };

  const handleOverlayClick = () => {
    if (playerRef.current && isPlayerReady) {
      if (playerRef.current.getPlayerState() !== window.YT.PlayerState.PLAYING) {
        playerRef.current.playVideo();
      }
    }
  };

  useEffect(() => {
    const updateFullscreenStatus = () => {
      setIsActuallyFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', updateFullscreenStatus);
    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreenStatus);
    };
  }, []);

  const shouldShowOverlay = !isActuallyFullscreen && isPlayerReady &&
                           (playerState === window.YT.PlayerState.PAUSED ||
                            playerState === window.YT.PlayerState.ENDED);

  return (
    <Box sx={{ position: 'relative', height: '100%', backgroundColor: '#000' }}>
      {!isPlayerReady && (
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
        iframeClassName="absolute top-0 left-0 w-full h-full"
        className="h-full"
        key={videoId}
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
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: 'white',
          }}
        >
          <Typography variant="h6">
            {playerState === window.YT.PlayerState.ENDED ? "Video Ended" : "Click to Play"}
          </Typography>
          <Typography variant="subtitle2">Happy Learning!</Typography>
          <Typography variant="subtitle2">--Kamrul Hasan--</Typography>
        </Box>
      )}
    </Box>
  );
});

export default DistractionFreePlayer;

