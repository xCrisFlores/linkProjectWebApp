import { Typography, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from 'react';
import { ItemContainer, ItemImageProp, ItemProp, ItemPropGroup, ListContainer, MainContainer, TitleIcon } from './ProjectsList.styles';
import { CalendarMonth, Person } from '@mui/icons-material';
import { getAllProjects, getAllInnovations, getAllAreas } from '../../api/projectApi';
import useApiRequest from '../../hooks/useApiRequest';
import { LoadingView, ErrorView } from '../../components';
import { useNavigate } from 'react-router-dom';

export default function ProjectsList() {
    const navigate = useNavigate();
    const { loading, error, success, execute } = useApiRequest(getAllProjects);
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [innovations, setInnovations] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedInnovation, setSelectedInnovation] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Obtener todos los proyectos, innovaciones y áreas
        Promise.all([
            getAllProjects(),
            getAllInnovations(),
            getAllAreas()
        ]).then(([projectsData, innovationsData, areasData]) => {
            setProjects(projectsData.data);
            setInnovations(innovationsData.data);
            setAreas(areasData.data);
            setFilteredProjects(projectsData.data); // Inicializar los proyectos filtrados con todos los proyectos
        });
    }, []);

    const handleFilterChange = () => {
        let filtered = projects;

        // Filtrar por innovación
        if (selectedInnovation) {
            filtered = filtered.filter(project => {
                // Buscar la innovación seleccionada y comprobar si el ID de la innovación coincide con el ID del proyecto
                const innovationMatch = innovations.filter(innovation => innovation.name === selectedInnovation);
                return innovationMatch.some(innovation => innovation.id === project.id);
            });
        }

        // Filtrar por área
        if (selectedArea) {
            filtered = filtered.filter(project => {
                // Buscar el área seleccionada y comprobar si el ID del área coincide con el ID del proyecto
                const areaMatch = areas.filter(area => area.name === selectedArea);
                return areaMatch.some(area => area.id === project.id);
            });
        }

        // Filtrar por búsqueda de nombre
        if (searchQuery) {
            filtered = filtered.filter(project => project.name && project.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredProjects(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [selectedInnovation, selectedArea, searchQuery, innovations, areas]);

    if (loading) return <LoadingView />;
    if (error) return <ErrorView />;

    return (
        <MainContainer>
            <Typography variant='h4'>Lista de proyectos</Typography>

            {/* Filtros */}
            <Box display="flex" gap={2} mb={4} flexWrap="wrap">
                <TextField
                    label="Buscar por nombre"
                    variant="outlined"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                    fullWidth
                    sx={{ maxWidth: 400 }}
                />

                <FormControl fullWidth sx={{ maxWidth: 250 }}>
                    <InputLabel>Innovación</InputLabel>
                    <Select
                        value={selectedInnovation}
                        label="Innovación"
                        onChange={(e) => setSelectedInnovation(e.target.value)}
                    >
                        <MenuItem value=''>Todas</MenuItem>
                        {innovations.map((innovation) => (
                            <MenuItem key={innovation.id} value={innovation.name}>
                                {innovation.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ maxWidth: 250 }}>
                    <InputLabel>Área</InputLabel>
                    <Select
                        value={selectedArea}
                        label="Área"
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <MenuItem value=''>Todas</MenuItem>
                        {areas.map((area) => (
                            <MenuItem key={area.id} value={area.name}>
                                {area.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={() => {
                    setSearchQuery("");
                    setSelectedInnovation("");
                    setSelectedArea("");
                }}>
                    Limpiar Filtros
                </Button>
            </Box>

            {/* Proyectos Filtrados */}
            <ListContainer>
                {filteredProjects && filteredProjects.length > 0 ? (
                    filteredProjects.map((item, index) =>
                        <ItemContainer
                            key={index}
                            component="button"
                            onClick={() => navigate('../details', { state: { id: item.id } })}
                        >
                            <ItemImageProp />
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
                    )
                ) : (
                    <Typography variant="body2">No se encontraron proyectos</Typography>
                )}
            </ListContainer>
        </MainContainer>
    );
}
