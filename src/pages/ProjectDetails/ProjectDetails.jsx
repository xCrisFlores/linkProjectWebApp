import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, ItemContainer, ItemImageProp, ItemWithIcon, MainContainer } from './ProjectDetails.styles';
import { AddBox, CalendarMonth, Person } from '@mui/icons-material';
import useApiRequest from '../../hooks/useApiRequest';
import { createMemberRequest, getAreas, getInnovations, getMembers, getProjectById, getRequirements } from '../../api/projectApi';
import { ErrorView, LoadingView } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { updateStudent } from '../../api/studentApi';

export default function ProjectDetails() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const projectApi = useApiRequest(getProjectById);
    const areasApi = useApiRequest(getAreas);
    const reqApi = useApiRequest(getRequirements);
    const innoApi = useApiRequest(getInnovations);
    const memApi = useApiRequest(getMembers);

    const projectLoading = projectApi.loading || areasApi.loading || reqApi.loading || innoApi.loading;
    const projectError = projectApi.error || areasApi.error || reqApi.error || innoApi.error;
    const projectSuccess = projectApi.success && areasApi.success && reqApi.success && innoApi.success;

    const memReqApi = useApiRequest(createMemberRequest);
    const studentApi = useApiRequest(updateStudent);

    const memReqLoading = memReqApi.loading || studentApi.loading;
    const memReqError = memReqApi.error || studentApi.error;
    const memReqSuccess = memReqApi.success && studentApi.success;

    useEffect(() => {
        projectApi.execute(id);
        areasApi.execute(id);
        reqApi.execute(id);
        innoApi.execute(id);
        memApi.execute(id);
    }, [id]);

    const [projectDetails, setProjectDetails] = useState(null);
    useEffect(() => {
        if (projectSuccess) {
            setProjectDetails({
                ...projectApi.success.data,
                areas: areasApi.success.data,
                req: reqApi.success.data,
                innovation: innoApi.success.data,
                members: memApi.success.data
            });
        }
    }, [projectSuccess]);

    useEffect(() => {
        if (memReqSuccess) {
            setUser((prevUser) => ({
                ...prevUser,
                student: {
                    ...prevUser.student,
                    status: 'pendant',
                },
            }));
            navigate('/dashboard/details', { state: { reload: true } });
        }
    }, [memReqSuccess]);

    const handleOnSubmit = () => {
        const request = {
            SubmittedDate: new Date().toISOString().split('T')[0],
            Status: 'pendant',
            ProjectId: projectDetails.id,
            StudentCode: user.code,
        };

        memReqApi.execute(request);
        studentApi.execute({ ...user.student, status: 'pendant' });
    };

    if (projectLoading || memReqLoading) return <LoadingView />;
    if (projectError || memReqError) return <ErrorView />;
    if (projectSuccess && projectDetails) {
        const HeaderItem = ({ size, value, title, icon = null }) => {
            return (
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
        };

        const Item = ({ size, children, title }) => {
            return (
                <Grid size={size}>
                    <ItemContainer>
                        <Typography variant="subtitle3">{title}</Typography>
                        {children}
                    </ItemContainer>
                </Grid>
            );
        };

        return (
            <MainContainer>
                <Typography variant='h4'>Detalles del proyecto</Typography>
                <Grid container spacing={2}>
                    <HeaderItem size={4} title={'Nombre'} value={projectDetails.name} />
                    <HeaderItem size={4} title={'Fecha de creación'} value={projectDetails.creationDate} icon={<CalendarMonth />} />
                    <HeaderItem size={2} title={'Total de miembros'} value={projectDetails.availableSpaces} icon={<Person />} />
                    <HeaderItem size={2} title={'Cupos disponibles'} value={projectDetails.availableSpaces} icon={<AddBox />} />
                    <Item size={12} title={'Descripción'}>
                        <Typography variant="body2">{projectDetails.description}</Typography>
                    </Item>
                    <Item size={3} title={'Logo'}>
                        <ItemImageProp />
                    </Item>
                    <Grid container spacing={2} size={9}>
                        <Item size={6} title={'Conocimientos requeridos'}>
                            {/* Renderizar los requisitos dinámicamente */}
                            <ul>
                                {projectDetails.req?.map((req, index) => (
                                    <li key={index}>{req.name}</li>
                                ))}
                            </ul>
                        </Item>
                        <Item size={6} title={'Miembros del equipo'}>
                            {/* Muestra los miembros dinámicamente */}
                            <ul>
                                {projectDetails.members?.map((mem, index) => (
                                    <li key={index}>{mem.name}</li>
                                ))}
                            </ul>
                        </Item>
                        <Item size={6} title={'Innovaciones'}>
                            {/* Renderizar las áreas dinámicamente */}
                            <ul>
                                {projectDetails.innovation?.map((inno, index) => (
                                    <li key={index}>{inno.name}</li>
                                ))}
                            </ul>
                        </Item>
                        <Item size={6} title={'Áreas'}>
                            {/* Renderizar las áreas dinámicamente */}
                            <ul>
                                {projectDetails.areas?.map((area, index) => (
                                    <li key={index}>{area.name}</li>
                                ))}
                            </ul>
                        </Item>
                    </Grid>
                </Grid>
                {
                    (user.student && user.student.status === 'no-member') &&
                    <Button variant='contained' onClick={(e) => handleOnSubmit(e)}>
                        Solicitar unirse al equipo
                    </Button>
                }
            </MainContainer>
        );
    }

    return <></>;
}
