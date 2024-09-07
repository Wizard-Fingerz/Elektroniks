import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f8f8f8', marginTop: 'auto' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        Elektroniks {new Date().getFullYear()}
        {'. All Rights Reserved.'}
      </Typography>
    </Box>
  );
};

export default Footer;
