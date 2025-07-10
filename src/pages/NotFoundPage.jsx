import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Container sx={{ textAlign: 'center', py: 8, paddingBlockEnd:'200px', }}>
      <Typography variant="h3" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;