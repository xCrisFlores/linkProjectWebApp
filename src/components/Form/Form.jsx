import React, { useState } from 'react'
import { FormContainer, FormField, FormGrid, FieldLabel, FieldHelperText, FormAlert } from './Form.styles';
import { Button, OutlinedInput, FormLabel, Typography} from '@mui/material'
import useForm from './useForm';
import SelectInput from '../SelectInput/SelectInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import FileInput from '../FileInput/FileInput';
import MultiSelectInput from '../MultiSelectInput/MultiSelectInput';
import ButtonGroupInput from '../ButtonGroupInput/ButtonGroupInput';


export default function Form({ onSubmitForm, fields }) {

/*     const renderCount = useRef(0);
    useEffect(() => {
        renderCount.current += 1;
        console.log(`Render count: ${renderCount.current}`);
    });
 */
    const {  formErrors, inputRefs, isFormValid, initOutValues } = useForm(fields);
    const [alertStatus, setAlertStatus] = useState({ status: 'success', visible: false });

    const handleOnInputClick = () => {
        if (alertStatus.visible === true) {
            setAlertStatus((prev) => ({ ...prev, visible: false }));
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            console.log('There are errors in form');
            return;
        }

        onSubmitForm && onSubmitForm(setAlertStatus);
        initOutValues();
    }

    const getInputProps = (field, error, index) => {
        const inputProps = {
            ...field.input,
            ref: inputRefs.current[index],
            error,
            onClick: () => handleOnInputClick(),
            size: 'small',
            sx: { borderRadius: '0.5rem' }
        }

        switch (field.input.type) {
            case 'password':
                return <PasswordInput {...inputProps} />
            case 'select':
                return <SelectInput {...inputProps}  />
            case 'multiselect':
                return <MultiSelectInput {...inputProps}  />
            case 'file':
                return <FileInput {...inputProps} />
            case 'buttongroup':
                return <ButtonGroupInput {...inputProps}  />
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
                                        <field.icon />
                                        <Typography variant='subtitle1'>
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
                alertStatus.visible &&
                <FormAlert
                    variant="filled"
                    severity={alertStatus.status}>
                    {alertStatus.status === 'success'
                        ? 'Form enviado correctamente.'
                        : 'Ocurrió un problema. Por favor, inténtalo más tarde.'}
                </FormAlert>
            }
            <Button
                variant='contained'
                onClick={(e) => handleOnSubmit(e)}>
                Enviar
            </Button>

        </FormContainer>
    )
}
