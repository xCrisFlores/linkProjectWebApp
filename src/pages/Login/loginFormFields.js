import {Person as PersonIcon, Lock as LockIcon} from '@mui/icons-material';

export let formFields = [{
    label: "Código UDG",
    input: {
        id: "code",
        type: 'text',
        required: true,
        placeholder: "Escribe tu codigo...",
    },
    validations: {
        match: {
            message: "El codigo debe contener solo 9 digitos.",
            value: /^\d{9}$/,
        },
    },
    icon: PersonIcon,
    gridColumnSpan: 2,
},
{
    label: "Contraseña",
    input: {
        id: "password",
        type: 'password',
        required: true,
        placeholder: "Escribe tu contraseña...",
    },
    icon: LockIcon,
    gridColumnSpan: 2,
}]
