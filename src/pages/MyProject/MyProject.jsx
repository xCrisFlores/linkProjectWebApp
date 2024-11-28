import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, ItemContainer, ItemImageProp, ItemWithIcon, MainContainer } from './ProjectDetails.styles';
import { ErrorContainer } from './MyProject.styles';
import { AddBox, CalendarMonth, Person } from '@mui/icons-material';
import useApiRequest from '../../hooks/useApiRequest';
import { createMemberRequest, getAreas, getInnovations, getMembers, getProjectById, getRequirements, getAllProjects, getMemberById } from '../../api/projectApi';
import { ErrorView, LoadingView } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { updateStudent } from '../../api/studentApi';

export default function MyProject() {
    const { user, setUser } = useContext(UserContext);  // Acceder al contexto de usuario
    const navigate = useNavigate();

    const handleOnClick = () => {
        // Navega al formulario
        navigate('../create-project');
    };


    const [projectDetails, setProjectDetails] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [isMember, setIsMember] = useState(true); // Estado para verificar si el usuario es miembro

    // Inicializamos las peticiones a la API
    const projectApi = useApiRequest(getProjectById);
    const areasApi = useApiRequest(getAreas);
    const reqApi = useApiRequest(getRequirements);
    const innoApi = useApiRequest(getInnovations);
    const memApi = useApiRequest(getMembers);
    const memReqApi = useApiRequest(createMemberRequest);
    const studentApi = useApiRequest(updateStudent);

    // Estado de carga y errores de las APIs
    const projectLoading = projectApi.loading || areasApi.loading || reqApi.loading || innoApi.loading || memApi.loading;
    const projectError = projectApi.error || areasApi.error || reqApi.error || innoApi.error || memApi.error;
    const projectSuccess = projectApi.success && areasApi.success && reqApi.success && innoApi.success && memApi.success;

    // Buscar el proyecto al que pertenece el usuario
    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                // Obtener todos los proyectos
                const allProjectsResponse = await getAllProjects();
                const allProjects = allProjectsResponse.data;

                if (!allProjects || allProjects.length === 0) {
                    setIsMember(false); // Si no hay proyectos, mostrar mensaje de que no pertenece a ninguno
                    return;
                }

                // Buscar el proyecto al que pertenece el usuario
                let foundMember = false;
                for (let project of allProjects) {
                    const memberResponse = await getMemberById(project.id, user.code);
                    if (memberResponse && memberResponse.data) {
                        // Si el miembro pertenece a este proyecto, obtener su id
                        setProjectId(project.id);
                        setIsMember(true); // El usuario es miembro
                        foundMember = true;
                        break;
                    }
                }

                if (!foundMember) {
                    setIsMember(false); // Si no se encuentra al miembro, marcar que no es miembro
                }
            } catch (error) {
                console.error("Error al obtener los proyectos: ", error);
                setIsMember(false); // Si ocurre un error, asumir que no es miembro
            }
        };

        fetchProjectDetails();
    }, [user.code]);

    // Ejecutar las peticiones de APIs con el id del proyecto si está disponible
    useEffect(() => {
        if (projectId) {
            projectApi.execute(projectId);
            areasApi.execute(projectId);
            reqApi.execute(projectId);
            innoApi.execute(projectId);
            memApi.execute(projectId);
        }
    }, [projectId]);

    // Mostrar la vista de detalles del proyecto si el usuario es miembro
    if (projectLoading) return <LoadingView />;
    if (projectError) return <ErrorView />;

    if (isMember && projectSuccess && projectDetails) {
        return (
            <MainContainer>
                <Typography variant="h4">Detalles del proyecto</Typography>
                <Grid container spacing={2}>
                    <HeaderItem size={4} title={'Nombre'} value={projectDetails.name || 'No disponible'} />
                    <HeaderItem size={4} title={'Fecha de creación'} value={projectDetails.creationDate || 'No disponible'} icon={<CalendarMonth />} />
                    <HeaderItem size={2} title={'Total de miembros'} value={projectDetails.availableSpaces || 'No disponible'} icon={<Person />} />
                    <HeaderItem size={2} title={'Cupos disponibles'} value={projectDetails.availableSpaces || 'No disponible'} icon={<AddBox />} />
                    <Item size={12} title={'Descripción'}>
                        <Typography variant="body2">{projectDetails.description || 'No disponible'}</Typography>
                    </Item>
                    <Item size={3} title={'Logo'}>
                        <ItemImageProp />
                    </Item>
                    <Grid container spacing={2} size={9}>
                        <Item size={6} title={'Conocimientos requeridos'}>
                            <ul>
                                {projectDetails.req?.length > 0 ? projectDetails.req.map((req, index) => (
                                    <li key={index}>{req.name}</li>
                                )) : <Typography>No hay requisitos disponibles.</Typography>}
                            </ul>
                        </Item>
                        <Item size={6} title={'Miembros del equipo'}>
                            <ul>
                                {projectDetails.members?.length > 0 ? projectDetails.members.map((mem, index) => (
                                    <li key={index}>{mem.name}</li>
                                )) : <Typography>No hay miembros en el equipo.</Typography>}
                            </ul>
                        </Item>
                        <Item size={6} title={'Innovaciones'}>
                            <ul>
                                {projectDetails.innovation?.length > 0 ? projectDetails.innovation.map((inno, index) => (
                                    <li key={index}>{inno.name}</li>
                                )) : <Typography>No hay innovaciones disponibles.</Typography>}
                            </ul>
                        </Item>
                        <Item size={6} title={'Áreas'}>
                            <ul>
                                {projectDetails.areas?.length > 0 ? projectDetails.areas.map((area, index) => (
                                    <li key={index}>{area.name}</li>
                                )) : <Typography>No hay áreas disponibles.</Typography>}
                            </ul>
                        </Item>
                    </Grid>
                </Grid>
            </MainContainer>
        );
    }

    // Si el usuario no pertenece a ningún equipo, mostrar el mensaje correspondiente
    return (
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
}

const HeaderItem = ({ size, value, title, icon = null }) => (
    <Grid size={size}>
        <ItemContainer sx={{ gap: 0.5 }}>
            <Typography variant="body3">{title}</Typography>
            {
                icon
                    ? <ItemWithIcon>
                        <Typography variant="subtitle2">{value}</Typography>
                        {icon}
                    </ItemWithIcon>
                    : <Typography variant="subtitle2">{value}</Typography>
            }
        </ItemContainer>
    </Grid>
);

const Item = ({ size, children, title }) => (
    <Grid size={size}>
        <ItemContainer>
            <Typography variant="subtitle3">{title}</Typography>
            {children}
        </ItemContainer>
    </Grid>
);
