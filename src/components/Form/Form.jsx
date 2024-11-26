import React, { useEffect, useState } from 'react'
import { FormContainer, FormField, FormGrid, FieldLabel, FieldHelperText, FormAlert } from './Form.styles';
import { Button, OutlinedInput, FormLabel, Typography } from '@mui/material'
import useForm from './useForm';
import SelectInput from '../SelectInput/SelectInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import FileInput from '../FileInput/FileInput';
import MultiSelectInput from '../MultiSelectInput/MultiSelectInput';
import ButtonGroupInput from '../ButtonGroupInput/ButtonGroupInput';

export default function Form({ fields = [], onSubmitForm = () => { }, loading = false, alert = null }) {
    const { getOutValues, formErrors, inputRefs, isFormValid, initOutValues } = useForm(fields);
    /*     const renderCount = useRef(0);
        useEffect(() => {
            renderCount.current += 1;
            console.log(`Render count: ${renderCount.current}`);
        });
    */

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const outValues = getOutValues();

        if (!isFormValid(outValues)) {
            console.log('There are errors in form');
            return;
        }

        await onSubmitForm(outValues);
        initOutValues();
    }

    const getInputProps = (field, error, index) => {
        const inputProps = {
            ...field.input,
            ref: inputRefs.current[index],
            error,
            size: 'small',
            sx: { borderRadius: '0.5rem' }
        }

        switch (field.input.type) {
            case 'password':
                return <PasswordInput {...inputProps} />
            case 'select':
                return <SelectInput {...inputProps} />
            case 'multiselect':
                return <MultiSelectInput {...inputProps} />
            case 'file':
                return <FileInput {...inputProps} />
            case 'buttongroup':
                return <ButtonGroupInput {...inputProps} />
            default:
                return <OutlinedInput {...inputProps} />
        }
    }

    return (
        <FormContainer>
            <FormGrid container spacing={3}>
                {
                    fields.map((field, index) => {
                        const error = formErrors[field.input.id]?.length > 0 ? true : false;
                        return (
                            <FormField key={index} gridColumn={`span ${field.gridColumnSpan}`}>
                                <FormLabel
                                    htmlFor={field.input.id}
                                    error={error}>
                                    <FieldLabel>
                                        <field.icon sx={{ fontSize: '1.25rem' }} />
                                        <Typography variant='subtitle3'>
                                            {`${field.label}${(field.input.required) && ' *'}`}
                                        </Typography>
                                    </FieldLabel>
                                </FormLabel>
                                {getInputProps(field, error, index)}
                                {error && (
                                    <FieldHelperText htmlFor={field.input.id}>
                                        {formErrors[field.input.id]?.map((key, index) =>
                                            <div key={index}>
                                                {field.validations[key].message} <br />
                                            </div>
                                        )}
                                    </FieldHelperText>
                                )}
                            </FormField>
                        )
                    })
                }
            </FormGrid>
            {
                alert &&
                <FormAlert
                    variant="filled"
                    severity={alert.type}>
                    {alert.message}
                </FormAlert>
            }
            <Button
                disabled={loading}
                variant='contained'
                onClick={(e) => handleOnSubmit(e)}>
                {loading ? 'Enviando...' : 'Enviar'}
            </Button>

        </FormContainer>
    )
}
