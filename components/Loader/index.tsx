import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="w-full h-96 relative">
      <CircularProgress
        className="absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2"
        sx={{ color: '#6366f1' }}
      />
    </div>
  );
};

export default Loader;
