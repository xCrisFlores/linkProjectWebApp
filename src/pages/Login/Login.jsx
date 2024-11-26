import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormContainer, FormTitle, MainContainer } from './Login.styles'
import { formFields } from './loginFormFields'
import useApiRequest from '../../hooks/useApiRequest'
import { getUserById } from '../../api/userApi'
import { Button, Container, Divider, Typography } from '@mui/material'
import { Form } from '../../components'
import { getStudentById } from '../../api/studentApi';
import { getAdviserById } from '../../api/adviserApi';
import UserContext from '../../context/UserContext';

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const userApi = useApiRequest(getUserById);
    const studentApi = useApiRequest(getStudentById);
    const adviserApi = useApiRequest(getAdviserById);
    
    const [alert, setAlert] = useState(null);
    const [formValues, setFormValues] = useState(null);
    
    useEffect(() => {
        if (userApi.success)
            handleOnUserSuccess(userApi.success.data);

        else if (userApi.error) {
            console.log("🚀 ~ useEffect ~ error:", userApi.error);

            (userApi.error.status === 404)
                ? setAlert({ type: 'error', message: `Este usuario no se ha registrado.` })
                : setAlert({ type: 'error', message: `Ocurrió un error. Inténtalo de nuevo.` });
        }
    }, [userApi.success, userApi.error])

    useEffect(() => {
        if (studentApi.success) 
            updateUserAndNavigate( studentApi.success.data, 'student');
        else if (adviserApi.success) 
            updateUserAndNavigate(adviserApi.success.data, 'adviser');
    }, [studentApi.success, adviserApi.success]);

    const updateUserAndNavigate = (otherObj, type) => {
        setUser((prevUser) => ({ ...prevUser, [type]: otherObj}));
        navigate('/dashboard');
    };

    const handleOnUserSuccess = (user) => {
        if (user.password !== formValues.password) {
            setAlert({ type: 'error', message: `La contraseña no coincide. Intenta de nuevo.` });
            return;
        }

        setUser(user);
        try {
            studentApi.execute(user.code);
            adviserApi.execute(user.code);
        } catch (error) {
            console.error("Error during API calls:", error);
            setAlert({ type: 'error', message: `Ha ocurrido un error. Intente de nuevo.` })
        }
    }

    const handleOnSingUp = () => {
        navigate('/signup');
    }

    const handleOnSubmitForm = (outValues) => {
        setFormValues(outValues);
        userApi.execute(Number(outValues.code));
    }

    return (
        <MainContainer>
            <FormContainer>
                <FormTitle>
                    <Typography variant='h4'>
                        Inicia sesión
                    </Typography>
                    <Typography variant='body1'>
                        Por favor ingresa a tu cuenta para continuar
                    </Typography>
                </FormTitle>
                <Form fields={formFields} onSubmitForm={handleOnSubmitForm} loading={userApi.loading} alert={alert} />
                <Divider />
                <Container sx={{ display: 'flex' }}>
                    <Typography variant='body2' color='grey'>
                        ¿Aún no tienes cuenta?
                    </Typography>
                    <Button
                        variant='text'
                        onClick={handleOnSingUp}
                        sx={{ py: 0, color: 'primary' }}>
                        Regístrate
                    </Button>
                </Container>
            </FormContainer>
        </MainContainer>
    )
}
