import React, { useState } from 'react'
import { FormContainer, FormTitle, MainContainer } from './SignUp.styles'
import { studentFormFields, teacherFormFields, userFormFields } from './signUpFormFields'
import { Form } from '../../components'
import { Typography } from '@mui/material'
import { School as SchoolIcon } from '@mui/icons-material';

export default function SignUp() {
    

    const [userType, setUserType] = useState('');
    console.log("🚀 ~ SignUp ~ userType:", userType)
    
    const newUserFormFields = [
        ...userFormFields,
        {
            label: "Tipo de cuenta",
            input: {
                id: "userType",
                type: 'buttongroup',
                required: true,
                onChange: (type) => setUserType(type),
                values: [
                    { id: 1, label: 'Estudiante' },
                    { id: 2, label: 'Asesor'},
                ]
            }, 
            icon: SchoolIcon,
            gridColumnSpan: 2,
        }
    ]

    const getFormFields = () => {
        switch (userType.id) {
            case 1:
                return [...newUserFormFields, ...studentFormFields];
            case 2:
                return [...newUserFormFields, ...teacherFormFields]; 
            default:
                return newUserFormFields;
        }

    }


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
                <Form fields={getFormFields()}/>
            </FormContainer>
        </MainContainer>
    )
}
