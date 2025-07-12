import { Box, Container, Typography, IconButton, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box sx={{
      bgcolor: '#071f37eb',
      color: '#b2e8ffdb',
      py: 3,
      mt: 'auto', // Pushes footer to the bottom
      textAlign: 'center',
    }}>
      <Container maxWidth={{ xs: 'sm', md: 'lg' }}>
        <Grid container spacing={3} columnSpacing={'80px'} justifyContent={{ xs: 'center' , md: 'center',lg: 'space-between' }} alignItems="flex-start">
          {/* Section 1: Copyright and App Info */}
          <Grid item xs={12} md={12} lg={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} component={RouterLink} to="/">
              FocusTube
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              © {new Date().getFullYear()} Developed by Kamrul Hasan <span style={{ fontStyle: 'italic' }}>(Beta version)</span>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
             Learn with focus, without distractions.
            </Typography>
          </Grid>

          {/* Section 2: Social Media Links */}
          <Grid item xs={12} md={12} lg={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Connect with Me
            </Typography>
            <Box sx={{ '& > *': { mx: 1 } }}>
              <IconButton color="inherit" aria-label="Facebook" href="https://www.facebook.com/kamrulhasan3778/" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" href="https://www.linkedin.com/in/kamrul-hasan-a2935017a/" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="GitHub" href="https://github.com/kamrulhasan2" target="_blank">
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Section 3: About Me */}
          <Grid item xs={12} md={12} lg={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              About Kamrul Hasan
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Passionate Software Engineer <br /> - with a focus on Web Development.
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Email: kamrulhasan20656@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Location: Mirpur, Dhaka, Bangladesh
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Phone: +88016017-80015
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;