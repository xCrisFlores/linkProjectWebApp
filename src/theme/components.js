const getComponents = (theme) => ({
    MuiCssBaseline: {
        styleOverrides: {
            body: { padding: 0, margin: 0 },
        }
    },
    MuiContainer: {
        defaultProps: {
            maxWidth: false,
            disableGutters: true,
        },
        styleOverrides: {
            root: { width: '100%', alignItems: 'center', justifyContent: 'center'}
        }
    },
    MuiTypography: {
        defaultProps: {
            color: 'inherit',
        },
    },
    MuiIconButton: {
        defaultProps: {
            color: 'inherit',
        },
    },
    MuiButton: {
        styleOverrides: {
            contained: {
                borderRadius: '0.75rem',
                borderWidth: '0.1rem',
                borderStyle: 'solid',
                borderColor: theme.palette.common.black,
                letterSpacing: '0.05rem',
                textTransform: 'none',
                boxShadow: 'none',
                ':hover':{
                    boxShadow: 'none',
                    borderRadius: '2rem',
                },
                
            },
            outlined:{
                textTransform: 'none',
                borderWidth: '0.1rem',
                ':hover':{
                    transform: 'none',
                    borderRadius: '2rem',
                    borderWidth: '0.1rem'
                }
            },
            text: {
                fontWeight: 500,
                borderRadius: '0.75rem',
                backgroundColor: 'transparent',
                color: theme.palette.common.black,
                letterSpacing: '0.05rem',
                textTransform: 'none',
            }
        },
    },
});

export default getComponents;
