import { styled } from '@mui/material/styles'
import { Alert, Box, FormHelperText } from '@mui/material'


export const FormContainer = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        width: '100%',
        height: '100%',
    }))

export const FormGrid = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr',
        gap: 3,
    }))

export const FormField = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'flex-start',
    }))

export const FormAlert = styled(Alert)(({ theme }) =>
    theme.unstable_sx({
        borderRadius: '1rem'
    }))

export const FieldLabel = styled(Box)(({ theme }) =>
    theme.unstable_sx({
        display: 'flex',
        flexDirection: 'row',
        gap: 1.5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: 'primary.main',
    }))
    
export const FieldHelperText = styled(FormHelperText)(({ theme }) =>
    theme.unstable_sx({
        mt: -1
    }))
