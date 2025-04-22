
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, Stack } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import { Link } from 'react-router';




const PlaylistCardItem = ({playlistThumbnail,playlistTitle,channelTitle,playlistId}) => {
 
  return (
    <Card sx={{ height:'100%' , display:'flex', flexDirection:'column', margin: 1}}>
      <CardMedia
        component="img"
        image={playlistThumbnail.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {`${playlistTitle.length > 50 ? playlistTitle.substr(0,50) + '...' : playlistTitle}`}
        </Typography>
        
        <Typography variant='body2' color="text.secondary">
            {channelTitle}
        </Typography>

      </CardContent>
      <Box sx={{flexGrow: 1}}> </Box>
      <CardActions>
        <Button to={`/player/${playlistId}`} component={Link}>
            <Stack direction="row" spacing={2} alignItems={'center'}>
                <PlayCircleOutline />
                <Typography variant="body2" fontWeight={600}>
                    Start Tutorial
                </Typography>
            </Stack>
        </Button>
      </CardActions>
    
    </Card>
  );
}

export default PlaylistCardItem;