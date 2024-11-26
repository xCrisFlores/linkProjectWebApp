import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ErrorContainer = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'background.default',
    color: 'common.black',
    textAlign: 'center',
    p: 3,
  })
);


