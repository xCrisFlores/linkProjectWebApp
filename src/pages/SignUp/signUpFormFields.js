import {
    Email as EmailIcon, Person as PersonIcon,
    Image as ImageIcon, Lock as LockIcon, Phone as PhoneIcon, Info as InfoIcon,
    Science as LaboratoryIcon, Lightbulb as SkillsIcon, CalendarMonth as CalendarIcon,
} from '@mui/icons-material';

export const userFormFields = [{
    label: "Nombres",
    input: {
        id: "names",
        type: 'text',
        required: true,
        placeholder: "Escribe tus nombres...",
    },
    validations: {
        length: {
            message: "Ingresa un nombre de al menos tres letras.",
            value: 3,
        },
    },
    icon: PersonIcon,
    gridColumnSpan: 1,
},
{
    label: "Apellidos",
    input: {
        id: "last_names",
        type: 'text',
        placeholder: "Escribe tus apellidos...",
        required: true,
    },
    validations: {
        length: {
            message: "Ingresa un apellido de al menos tres letras.",
            value: 3,
        },
    },

    icon: PersonIcon,
    gridColumnSpan: 1,
},
{
    label: "Correo electrónico",
    input: {
        id: "email",
        type: 'email',
        placeholder: "Escribe tu correo...",
        required: true,
    },
    validations: {
        match: {
            message: "Ingresa un correo electrónico válido.",
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
    },
    icon: EmailIcon,
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
    validations: {
        length: {
            message: "Ingresa una contraseña con al menos 8 caracteres.",
            value: 50,
        },
    },
    icon: LockIcon,
    gridColumnSpan: 2,
},
{
    label: "Foto de perfil",
    input: {
        id: "profile_photo",
        type: 'file',
        required: true,
        placeholder: "Selecciona una imagen de tus archivos...",
    },
    icon: ImageIcon,
    gridColumnSpan: 2,
}]


export const studentFormFields = [{
    label: "Teléfono móvil",
    input: {
        id: "phone_number",
        type: 'tel',
        required: true,
        placeholder: "Escribe tu número de teléfono...",
    },
    validations: {
        length: {
            message: "Ingresa un nombre de al menos tres letras.",
            value: 3,
        },
    },
    icon: PhoneIcon,
    gridColumnSpan: 2,
},
{
    label: "Detalles sobre ti",
    input: {
        id: "details",
        type: 'text',
        required: true,
        placeholder: "Escribe una breve descripción sobre ti...",
    },
    validations: {
        length: {
            message: "Ingresa un nombre de al menos tres letras.",
            value: 3,
        },
    },
    icon: InfoIcon,
    gridColumnSpan: 2,
},
{
    label: "Laboratorio",
    input: {
        id: "lab",
        type: 'select',
        required: true,
        placeholder: "Selecciona el laboratorio...",
        values: [
            { id: 1, label: 'Laboratorio 1: Introducción' },
            { id: 2, label: 'Laboratorio 2: Desarrollo' },
            { id: 3, label: 'Laboratorio 3: Conclusión' },
        ]
    },
    icon: LaboratoryIcon,
    gridColumnSpan: 2,
},
{
    label: "Habilidades",
    input: {
        id: "skills",
        type: 'multiselect',
        required: true,
        placeholder: "Selecciona tus habilidades...",
        values: [
            { id: 1, label: 'SQL' },
            { id: 2, label: 'POO' },
            { id: 3, label: 'Java' },
        ],
    },
    icon: SkillsIcon,
    gridColumnSpan: 2,
},
{
    label: "Horario disponible",
    input: {
        id: "schedule",
        required: true,
        placeholder: "Días de la semana con horas disponibles...",
        type: 'text',
    },
    icon: CalendarIcon,
    gridColumnSpan: 2,
}]

export const teacherFormFields = [{
    label: "Departamento/División",
    input: {
        id: "dep",
        type: 'select',
        required: true,
        placeholder: "Selecciona el departamento...",
        values: [
            { id: 1, label: 'Matematicas' },
            { id: 2, label: 'Ingenierias' },
            { id: 3, label: 'Física' },
        ]
    },
    icon: LaboratoryIcon,
    gridColumnSpan: 2,
}]