import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { LoadingContainer, StyledTypography } from './LoadingView.styles';

const LoadingView = () => {
  return (
    <LoadingContainer>
      <CircularProgress size={60} />
      <Typography variant="h6">Cargando...</Typography>
      <StyledTypography variant="body2">
        Esto toma menos que hacer café ☕
      </StyledTypography>
    </LoadingContainer>
  );
};

export default LoadingView;
