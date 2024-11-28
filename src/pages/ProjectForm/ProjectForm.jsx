import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { createProject, createReqs, createInnos, createAreas } from "../../api/projectApi"; // Asegúrate de que esta función esté correctamente importada

const innovations = [
  "Automatización de tareas",
  "Soluciones tecnológicas para salud",
  "Optimización energética",
];

const areas = [
  "Inteligencia Artificial",
  "Biología",
  "Ingeniería Eléctrica",
];

export default function CreateProject() {
  // Estados separados para cada entidad
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [path, setPath] = useState("");

  const [selectedInnovations, setSelectedInnovations] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const [requirements, setRequirements] = useState([{ name: "", description: "" }]);

  const [alert, setAlert] = useState({
    open: false,
    type: "success", // success | error
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "availableSpaces":
        setAvailableSpaces(value);
        break;
      case "path":
        setPath(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (name, value) => {
    if (name === "selectedInnovations") {
      setSelectedInnovations(value);
    } else if (name === "selectedAreas") {
      setSelectedAreas(value);
    }
  };

  const handleRequirementChange = (index, field, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index][field] = value;
    setRequirements(updatedRequirements);
  };

  const addRequirement = () => {
    setRequirements([...requirements, { name: "", description: "" }]);
  };

  const removeRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Formateamos la fecha para que sea solo "YYYY-MM-DD"
      const creationDate = new Date().toISOString().split("T")[0];

      // Datos del proyecto
      const projectData = {
        name,
        description,
        availableSpaces,
        path,
        creationDate,  // Fecha de creación
      };

      // Crear el proyecto
      const projectResponse = await createProject(projectData);

      // Obtener el ID del proyecto recién creado
      const projectId = projectResponse.data.id;

      // Crear innovaciones, áreas y requisitos
      const innovationsToSend = selectedInnovations.map((innovation) => ({
        projectId,
        name: innovation,
        description: "Descripción de la innovación",  // Descripción placeholder
      }));

      const areasToSend = selectedAreas.map((area) => ({
        projectId,
        name: area,
        description: "Descripción del área",  // Descripción placeholder
      }));

      const requirementsToSend = requirements.map((req) => ({
        projectId,
        name: req.name,
        description: req.description,
      }));

      // Enviar todas las innovaciones, áreas y requisitos a sus respectivos endpoints
      await Promise.all([
        ...innovationsToSend.map((innovation) => createInnos(innovation)),
        ...areasToSend.map((area) => createAreas(area)),
        ...requirementsToSend.map((req) => createReqs(req)),
      ]);

      setAlert({
        open: true,
        type: "success",
        message: "¡Proyecto creado exitosamente!",
      });

      // Reiniciar formulario
      setName("");
      setDescription("");
      setAvailableSpaces(0);
      setPath("");
      setSelectedInnovations([]);
      setSelectedAreas([]);
      setRequirements([{ name: "", description: "" }]);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      setAlert({
        open: true,
        type: "error",
        message: "Hubo un error al crear el proyecto. Intenta nuevamente.",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 600,
        margin: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Crear Proyecto
      </Typography>

      <TextField
        label="Nombre del Proyecto"
        name="name"
        value={name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Descripción"
        name="description"
        value={description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
      />

      <TextField
        label="Espacios Disponibles"
        name="availableSpaces"
        type="number"
        value={availableSpaces}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Ruta del Proyecto"
        name="path"
        value={path}
        onChange={handleChange}
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel>Innovaciones</InputLabel>
        <Select
          multiple
          value={selectedInnovations}
          onChange={(e) => handleSelectChange("selectedInnovations", e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {innovations.map((innovation, index) => (
            <MenuItem key={index} value={innovation}>
              {innovation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel>Áreas</InputLabel>
        <Select
          multiple
          value={selectedAreas}
          onChange={(e) => handleSelectChange("selectedAreas", e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {areas.map((area, index) => (
            <MenuItem key={index} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {requirements.map((requirement, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Requisito"
            value={requirement.name}
            onChange={(e) => handleRequirementChange(index, "name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Descripción"
            value={requirement.description}
            onChange={(e) => handleRequirementChange(index, "description", e.target.value)}
            fullWidth
          />
          <IconButton onClick={() => removeRequirement(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={addRequirement}>
        <AddCircleIcon /> Agregar Requisito
      </Button>

      <Button type="submit" variant="contained" color="secondary">
        Crear Proyecto
      </Button>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
