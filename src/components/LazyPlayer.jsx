import React, { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const DistractionFreePlayer = lazy(() => import('./DistractionFreePlayer'));

const LazyPlayer = (props) => {
  return (
    <Suspense fallback={
      <Box sx={{
        position: 'relative', height: '100%', backgroundColor: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <CircularProgress color="inherit" sx={{ color: 'white' }} />
      </Box>
    }>
      <DistractionFreePlayer {...props} />
    </Suspense>
  );
};

export default LazyPlayer;
