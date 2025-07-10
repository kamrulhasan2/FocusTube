import VideoItem from './VideoItem';
import { List, Paper, Typography } from '@mui/material';

const VideoList = ({ videos, currentVideoId, onSelectVideo }) => { 
  if (!videos || videos.length === 0) {
    return <Typography>No videos in this playlist.</Typography>;
  }

  return (
    <Paper elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <List dense>
        {videos.map((video) => (
          <VideoItem
            key={video.id}
            video={video}
            isSelected={video.id === currentVideoId}
            onSelectVideo={onSelectVideo}
          />
        ))}
      </List>
    </Paper>
  );
};

export default VideoList;