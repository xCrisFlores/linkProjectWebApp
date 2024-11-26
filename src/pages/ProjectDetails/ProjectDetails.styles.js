import { Box, Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    }));
export const Grid = styled(Grid2)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
    }));

export const ItemContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        alignItems: 'stretch',
        backgroundColor: 'common.white',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: 1,
        p: 2,
        color: 'primary.main'
    }));

export const ItemWithIcon = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        gap: 1,
        justifyContent: 'space-between'
    }));

export const ItemImageProp = styled('img')(({ theme }) =>
    theme.unstable_sx({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/fallback_image.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }));
