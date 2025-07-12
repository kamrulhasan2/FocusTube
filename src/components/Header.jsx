import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    console.log('handleDrawerToggle called');
    setMobileOpen(!mobileOpen);
    console.log('mobileOpen state after toggle:', !mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 , color: '#00fff5' }}>
        FocusTube
        <br />
        <small>Learn Without Distraction</small>
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/">
            <ListItemText primary="Home" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/blog">
            <ListItemText primary="Blog" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/saved">
            <ListItemText primary="Saved" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/favorites">
            <ListItemText primary="Favorites" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" component={RouterLink} to="/" noWrap sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', padding: '10px', lineHeight: '0.95' }}>
          FocusTube <br />
          <hr className="my-1 border-t border-dotted border-gray-300 w-36" />
          <small>Learn Without Distraction</small>
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/blog">Blog</Button>
          <Button color="inherit" component={RouterLink} to="/saved">Saved</Button>
          <Button color="inherit" component={RouterLink} to="/favorites">Favorites</Button>
        </Box>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' }, fontSize: '2rem' }}
          >
            <MenuIcon />
          </IconButton>
      </Toolbar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: '#0453e6e8' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
};
export default Header;