import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Container)(({ theme }) =>
    theme.unstable_sx({
        boxSizing: 'border-box',
        backgroundColor: 'background.main',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        px: 14,
    }));

export const FormContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        alignItems: 'stretch',
        backgroundColor: 'common.white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50%',
        p: 7,
        gap: 3,
        overflow: 'hidden',
    }));

export const FormTitle = styled(Container)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
    }));
