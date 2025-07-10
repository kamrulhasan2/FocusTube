import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

const VideoItem = ({ video, isSelected, onSelectVideo }) => { 
  return (
    <ListItem disablePadding selected={isSelected}>
      <ListItemButton onClick={() => onSelectVideo(video.id)}>
        <ListItemAvatar>
          <Avatar variant="square" src={video.thumbnailUrl} alt={video.title} sx={{ width: 80, height: 45, mr:1 }}/>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body2" sx={{
              fontWeight: isSelected ? 'bold' : 'normal',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {video.title}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

VideoItem.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectVideo: PropTypes.func.isRequired,
};

export default VideoItem;