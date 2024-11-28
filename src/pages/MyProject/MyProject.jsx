import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Box, Button, Typography } from '@mui/material';
import { ErrorContainer } from './MyProject.styles';

export default function MyProject() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleOnClick = () => {
        // Navega al formulario
        navigate('../create-project');
    };

    if (user.status !== 'member') return (
        <ErrorContainer>
            <Typography variant="h4">¡Ups! Aún no eres parte de ningún equipo.</Typography>
            {
                (user.student)
                    ? <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1">
                            Crea un proyecto para ser líder o solicita unirte a uno.
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={handleOnClick}>
                            Crea un proyecto
                        </Button>
                    </Box>
                    : <Typography variant="body1">
                        Solicita unirte a un proyecto o espera a que un líder te agregue a su equipo.
                    </Typography>
            }
        </ErrorContainer>
    );

    return <></>;
}
