import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="subtitle1" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none',padding: '10px', lineHeight: '0.95' }}>
         FocusTube <br />
          <hr style={{ margin: '5px 0', border: '1px dotted', borderColor: '#d7b7b7', width: "145px" }} />
          <small>Learn Without Distraction</small>

        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/blog">Blog</Button>
          <Button color="inherit" component={RouterLink} to="/saved">Saved</Button>
          <Button color="inherit" component={RouterLink} to="/favorites">Favorites</Button>          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;