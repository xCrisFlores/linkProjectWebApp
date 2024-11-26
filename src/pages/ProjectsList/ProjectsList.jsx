import { Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ItemContainer, ItemImageProp, ItemProp, ItemPropGroup, ListContainer, MainContainer, TitleIcon } from './ProjectsList.styles'
import { projectsListDummy as projectsList } from './projectsListDummy'
import { CalendarMonth, Person } from '@mui/icons-material'
import { getAllProjects } from '../../api/projectApi'
import useApiRequest from '../../hooks/useApiRequest'
import { LoadingView, ErrorView } from '../../components'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function ProjectsList() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { loading, error, success, execute } = useApiRequest(getAllProjects);
    const [projects, setProjects] = useState(null);

    useEffect(() => { execute() }, []);

    useEffect(() => {
        console.log("🚀 ~ ProjectsList ~ success:", success);
        if (success && success.status === 200)
            setProjects(success.data);
    }, [success]);

    if (loading) return <LoadingView />
    if (error || !user) return <ErrorView />
    if (success && projects)
        return (
            <MainContainer>
                <ListContainer>
                    {projects.map((item, index) =>
                        <ItemContainer
                            key={index}
                            component="button"
                            onClick={() => navigate('../details', { state: { id: item.id } })}>
                            <ItemImageProp>
                            </ItemImageProp>
                            <ItemProp>
                                <Typography variant='subtitle3' color='primary.main'>
                                    {item.name}
                                </Typography>
                                <Typography variant='body2'>
                                    {item.description}
                                </Typography>
                            </ItemProp>
                            <ItemPropGroup>
                                <ItemProp>
                                    <TitleIcon>
                                        <CalendarMonth fontSize='0.75rem' />
                                        <Typography variant='body3'>
                                            Creación
                                        </Typography>
                                    </TitleIcon>
                                    <Typography variant='body2'>
                                        {item.creationDate}
                                    </Typography>
                                </ItemProp>
                                <ItemProp>
                                    <TitleIcon>
                                        <Person fontSize='0.75rem' />
                                        <Typography variant='body3'>
                                            Cupos
                                        </Typography>
                                    </TitleIcon>
                                    <Typography variant='body2'>
                                        {item.availableSpaces}
                                    </Typography>
                                </ItemProp>
                            </ItemPropGroup>
                        </ItemContainer>
                    )}
                </ListContainer>

            </MainContainer>
        )

    return <></>
}
