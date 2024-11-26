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

    const { loading, error, success, execute } = useApiRequest(getUserById);
    const studentApi = useApiRequest(getStudentById);
    const advisorApi = useApiRequest(getAdviserById);
    const [alert, setAlert] = useState(null);
    const [formValues, setFormValues] = useState(null);

    const updateUserAndNavigate = (user, apiData, type) => {
        setUser({ ...user, ...apiData, type });
        navigate('/dashboard');
    };

    const handleOnUserSuccess = async (user) => {
        console.log("Successful getById request.", user);

        if (user.password !== formValues.password) {
            setAlert({ type: 'error', message: `La contraseña no coincide. Intenta de nuevo.` });
            return;
        }

        await studentApi.execute(user.code);
        if (studentApi.success) {
            updateUserAndNavigate(user, studentApi.success.data, 'adviser');
            return;
        }

        await advisorApi.execute(user.code);
        if (advisorApi.success) {
            updateUserAndNavigate(user, advisorApi.success.data, 'adviser');
            return;
        }
        setAlert({ type: 'error', message: `Ha ocurrido un error. Intente de nuevo.` })
    }

    useEffect(() => {
        if (success)
            handleOnUserSuccess(success.data);

        else if (error) {
            console.log("🚀 ~ useEffect ~ error:", error);

            (error.status === 404)
                ? setAlert({ type: 'error', message: `Este usuario no se ha registrado.` })
                : setAlert({ type: 'error', message: `Ocurrió un error. Inténtalo de nuevo.` });
        }
    }, [success, error])

    const handleOnSingUp = () => {
        //console.log(navigate)
        navigate('/signup');
    }

    const handleOnSubmitForm = (outValues) => {
        setFormValues(outValues);
        execute(Number(outValues.code));
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
                <Form fields={formFields} onSubmitForm={handleOnSubmitForm} loading={loading} alert={alert} />
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
