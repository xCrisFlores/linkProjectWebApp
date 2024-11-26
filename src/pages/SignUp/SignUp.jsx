import React, { useEffect, useMemo, useState } from 'react'
import { Form } from '../../components'
import { Typography } from '@mui/material'
import { FormContainer, FormTitle, MainContainer } from './SignUp.styles'
import { studentFormFields, teacherFormFields, userFormFields } from './signUpFormFields'
import useApiRequest from '../../hooks/useApiRequest'
import { createUser } from '../../api/userApi'
import { createStudent } from '../../api/studentApi'
import { createAdviser } from '../../api/adviserApi'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [alert, setAlert] = useState(null);

    const apiRequestUser = useApiRequest(createUser);
    const apiRequestStudent = useApiRequest(createStudent);
    const apiRequestAdviser = useApiRequest(createAdviser);

    const loading = apiRequestUser.loading || apiRequestStudent.loading || apiRequestAdviser.loading;
    const success = apiRequestUser.success;
    const error = apiRequestUser.error || apiRequestStudent.error || apiRequestAdviser.error;

    useEffect(() => {
        if (success){
            console.log("🚀 ~ signup ~ success:", success)
            navigate('../');
        }
        else if (error) 
            setAlert({ type: 'error', message: `Ocurrió un error. Inténtalo de nuevo` });
    }, [success, error])
    

    const baseFormFields = useMemo(() => {
        userFormFields[userFormFields.length - 1].input["onChange"] = (type) => setUserType(type);
        return userFormFields;
    }, []);

    const handleOnSubmitForm = async (outValues) => {
        const code = Number(outValues.code);
        const user = {
            Code: code,
            Email: outValues.email,
            Name: outValues.name,
            Password: outValues.password,
            Path: outValues.path,
        }
        await apiRequestUser.execute(user);

        if (userType.id === 1) {
            const student = {
                StudentCode: code,
                Phone: outValues.phone,
                Status: 'no-member',
                Lab: outValues.lab,
                Biography: outValues.bio,
            }
            //console.log("🚀 ~ handleOnSubmitForm ~ student:", student)
            await apiRequestStudent.execute(student);
        }

        if (userType.id === 2) {
            const adviser = {
                AdviserCode: code,
                Division: outValues.division,
            }
            //console.log("🚀 ~ handleOnSubmitForm ~ adviser:", adviser)
            await apiRequestAdviser.execute(adviser);
        }
    }

    const formFields = useMemo(() => {
        switch (userType.id) {
            case 1:
                return [...baseFormFields, ...studentFormFields];
            case 2:
                return [...baseFormFields, ...teacherFormFields];
            default:
                return baseFormFields;
        }
    }, [userType, baseFormFields]);

    return (
        <MainContainer>
            <FormContainer>
                <FormTitle>
                    <Typography variant='h4'>
                        Regístrate
                    </Typography>
                    <Typography variant='body1'>
                        Únete a un equipo o administralo
                    </Typography>
                </FormTitle>
                <Form fields={formFields} onSubmitForm={handleOnSubmitForm} loading={loading} alert={alert}/>
            </FormContainer>
        </MainContainer>
    )
}
