import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Grid, ItemContainer, ItemWithIcon, MainContainer } from './ProjectDetails.styles';
import { AddBox, CalendarMonth, Person } from '@mui/icons-material';
import useApiRequest from '../../hooks/useApiRequest';
import { getAreas, getInnovations, getProjectById, getRequirements } from '../../api/projectApi';
import { ErrorView, LoadingView } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProjectDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || null;

    const projectApi = useApiRequest(getProjectById);
    const areasApi = useApiRequest(getAreas);
    const reqApi = useApiRequest(getRequirements);
    const innoApi = useApiRequest(getInnovations);

    const loading = projectApi.loading || areasApi.loading || reqApi.loading || innoApi.loading;
    const error = projectApi.error || areasApi.error || reqApi.error || innoApi.error;
    const success = projectApi.success && areasApi.success && reqApi.success && innoApi.success;


    useEffect(() => {
        projectApi.execute(id);
        areasApi.execute(id);
        reqApi.execute(id);
        innoApi.execute(id);
    }, [id]);

    const [projectDetails, setProjectDetails] = useState(null);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ success:", success)
        if (success) {
            setProjectDetails({
                ...projectApi.success.data,
                areas: areasApi.success.data,
                req: reqApi.success.data,
                innovation: innoApi.success.data[0]
            });
        }
    }, [success])

    const handleOnSubmit = () => {
        //navigate('../join_project', { state: { id: projectDetails.id } });
    }


    if (loading) return <LoadingView />
    if (error) return <ErrorView />
    if (success && projectDetails) {
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
        }

        return (
            <MainContainer>
                <Typography variant='h4'>Detalles del proyecto</Typography>
                <Grid container spacing={2}>
                    <HeaderItem size={4} title={'Nombre'} value={projectDetails.name} />
                    <HeaderItem size={4} title={'Fecha de creación'} value={projectDetails.creationDate} icon={<CalendarMonth />} />
                    <HeaderItem size={2} title={'Total de miembros'} value={projectDetails.availableSpaces} icon={<Person />} />
                    <HeaderItem size={2} title={'Cupos disponibles'} value={projectDetails.availableSpaces} icon={<AddBox />} />
                    <Item size={12} title={'Descripción'}>
                        <Typography variant="body2">
                            {projectDetails.description}
                        </Typography>
                    </Item>
                    <Item size={3} title={'Logo'}>
                        <Box sx={{ width: "100%", height: "100%" }}>
                            <Typography variant="body2">Aquí va el logo</Typography>
                        </Box>
                    </Item>
                    <Grid container spacing={2} size={9}>
                        <Item size={6} title={'Conocimientos requeridos'}>
                            {projectDetails.req.map((req, index) =>
                                <Typography key={index} variant="body2">{req.id}</Typography>
                            )}
                        </Item>
                        <Item size={6} title={'Miembros del equipo'}>
                            {projectDetails.req.map((req, index) =>
                                <Typography key={index} variant="body2">{req.id}</Typography>
                            )}
                        </Item>
                        <Item size={6} title={'Tipo de innovación'}>
                            <Typography variant="body2">{projectDetails.innovation}</Typography>
                        </Item>
                        <Item size={6} title={'Áreas'}>
                            {projectDetails.areas.map((area, index) =>
                                <Typography key={index} variant="body2">{area.id}</Typography>
                            )}
                        </Item>
                    </Grid>
                </Grid>
                <Button
                    variant='contained'
                    onClick={(e) => handleOnSubmit(e)}>
                    Solicitar unirse al equipo
                </Button>
            </MainContainer>
        );
    }
    return <></>;
}
