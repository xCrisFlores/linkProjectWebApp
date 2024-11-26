import { styled } from '@mui/material/styles'
import { Container, Drawer } from '@mui/material'

export const StyledDrawer = styled(Drawer)(({ theme }) =>
    theme.unstable_sx({
        width: 250,
        flexShrink: 0,
        color: 'common.white',
        '& .MuiDrawer-paper': {
            alignItems: 'stretch',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            py: 3, gap: 1,
            width: 250,
        },
    }))
export const LogoContainer = styled(Container)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        gap: 2,
        color: 'primary.main',
        pb: 1,
    }))

export const AccountContainer = styled(Container)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        gap: 1,
        color: 'secondary.main',
        justifyContent: 'space-between',
        padding: 2,
        position: 'absolute',
        bottom: 0,
    }))


