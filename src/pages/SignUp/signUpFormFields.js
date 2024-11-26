import {
    Email as EmailIcon, Person as PersonIcon,
    Image as ImageIcon, Lock as LockIcon, Phone as PhoneIcon, Info as InfoIcon,
    Science as LaboratoryIcon, Lightbulb as SkillsIcon, CalendarMonth as CalendarIcon, School as SchoolIcon
} from '@mui/icons-material';

export let userFormFields = [{
    label: "Nombre",
    input: {
        id: "name",
        type: 'text',
        required: true,
        placeholder: "Escribe tu nombre completo...",
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
        match: {
            message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.",
            value: /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        },
    },
    icon: LockIcon,
    gridColumnSpan: 2,
},
{
    label: "Foto de perfil",
    input: {
        id: "path",
        type: 'file',
        required: true,
        placeholder: "Selecciona una imagen de tus archivos...",
    },
    icon: ImageIcon,
    gridColumnSpan: 2,
},
{
    label: "Tipo de cuenta",
    input: {
        id: "userType",
        type: 'buttongroup',
        required: true,
        values: [
            { id: 1, label: 'Estudiante' },
            { id: 2, label: 'Asesor'},
        ]
    }, 
    icon: SchoolIcon,
    gridColumnSpan: 2,
}]


export const studentFormFields = [{
    label: "Teléfono móvil",
    input: {
        id: "phone",
        type: 'tel',
        required: true,
        placeholder: "Escribe tu número de teléfono...",
    },
    validations: {
        match: {
            message: "El número debe ser válido, por ejemplo: +52 3320135543",
            value:/^\d{10}$/,
        },
    },
    icon: PhoneIcon,
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
            'Laboratorio 1: Introducción' ,
            'Laboratorio 2: Desarrollo',
            'Laboratorio 3: Conclusión',
        ]
    },
    icon: LaboratoryIcon,
    gridColumnSpan: 2,
},
{
    label: "Detalles sobre ti",
    input: {
        id: "bio",
        type: 'text',
        required: true,
        placeholder: "Escribe una breve descripción sobre ti...",
    },
    validations: {
        length: {
            message: "Ingresa un nombre de al menos diez letras.",
            value: 10,
        },
    },
    icon: InfoIcon,
    gridColumnSpan: 2,
},
/* {
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
} */]

export const teacherFormFields = [{
    label: "Departamento/División",
    input: {
        id: "division",
        type: 'select',
        required: true,
        placeholder: "Selecciona la división",
        values: [
            'Matematicas' ,
            'Ingenierias' ,
            'Física',
            'DIVTIC',
        ]
    },
    icon: LaboratoryIcon,
    gridColumnSpan: 2,
}]
