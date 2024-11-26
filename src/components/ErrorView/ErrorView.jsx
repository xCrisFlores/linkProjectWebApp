import React from 'react';
import { Typography } from '@mui/material';
import { ErrorContainer, ErrorImage } from './ErrorView.styles';

const ErrorView = () => {
  return (
    <ErrorContainer>
      <Typography variant="h4">¡Ups! Algo salió mal.</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        No te preocupes, estamos trabajando en ello. Mientras tanto, disfruta a este tierno gatito. 🐾
      </Typography>
      <ErrorImage 
        src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="Imagen de gatitos adorables" 
      />
    </ErrorContainer>
  );
};

export default ErrorView;
