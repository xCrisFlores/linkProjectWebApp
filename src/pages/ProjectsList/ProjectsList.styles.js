import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        alignItems: 'stretch',
        backgroundColor: 'background.main',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        p: 3,
    }));

export const ListContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }));

export const ItemContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        alignItems: 'center',
        display: 'flex',
        gap: 4, p: 2,
        justifyContent: 'start',
        backgroundColor: 'common.white',
        borderRadius: '1rem',
        borderStyle: 'solid',
        borderColor: 'grey.main',
        borderWidth: '0.1rem',
        textAlign: 'initial',
        verticalAlign: 'initial',
        position: 'relative',
        overflow: 'hidden',
    }));

export const ItemProp = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        alignItems: 'stretch',
    }));

export const ItemPropGroup = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        gap: 4,
        position: 'absolute',
        right: "4rem",
    }));

export const ItemImageProp = styled('img')(({ theme }) =>
    theme.unstable_sx({
        width: '10rem',
        height: '6.25rem',
        objectFit: 'cover',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/fallback_image.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }));

export const TitleIcon = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        alignItems: 'center',
        display: 'flex',
        gap: 0.5,
        color: 'primary.main',
    }));

