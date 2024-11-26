import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ErrorContainer = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'background.default',
    color: 'text.primary',
    textAlign: 'center',
    p: 3,
  })
);

export const ErrorImage = styled('img')(({ theme }) =>
  theme.unstable_sx({
    mt: 3,
    maxWidth: '40%',
    height: 'auto',
    borderRadius: '1rem',
  })
);
