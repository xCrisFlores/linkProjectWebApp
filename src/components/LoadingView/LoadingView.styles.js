import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const LoadingContainer = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'background.default',
    color: 'text.primary',
    p: 3,
  })
);

export const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    mt: 1,
    fontStyle: 'italic',
    color: 'text.secondary',
  })
);
