import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import { getRequests } from './api'; // Asegúrate de que esta función esté correctamente importada

export default function RequestList({ id }) {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Estado para errores

  // Cargar las solicitudes al montar el componente
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests(id);  // Hacemos la llamada a la API
        setRequests(response.data);  // Guardamos los datos de la API
      } catch (err) {
        setError("Error al cargar las solicitudes");  // Manejamos errores
      } finally {
        setLoading(false);  // Cambiamos el estado de carga
      }
    };

    fetchRequests();
  }, [id]);  // Dependemos del `id` para recargar si cambia

  // Filtrar las solicitudes por el nombre del proyecto (simulación de proyecto)
  const filteredSolicitudes = requests.filter((solicitud) =>
    solicitud.projectId.toString().includes(search.toLowerCase()) // Cambiar esto según lo que quieras buscar
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom>
        Tus Solicitudes
      </Typography>

      {/* Barra de búsqueda */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <TextField
          label="Buscar proyecto"
          variant="outlined"
          size="small"
          sx={{ width: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
        />
      </Box>

      {/* Carga o error */}
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", color: "red" }}>
          <Typography variant="h6">{error}</Typography>
        </Box>
      ) : (
        // Tabla de solicitudes
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre de Proyecto</strong></TableCell>
                <TableCell><strong>Líder de Equipo</strong></TableCell>
                <TableCell><strong>Fecha de Solicitud</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSolicitudes.length > 0 ? (
                filteredSolicitudes.map((solicitud, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#d9d9d9", // Color gris claro al pasar el cursor
                        transition: "background-color 0.3s ease", // Transición suave
                      },
                    }}
                  >
                    <TableCell sx={{ boxShadow: 1 }}>
                      {/* Aquí puedes obtener el nombre del proyecto, si es necesario */}
                      Proyecto {solicitud.projectId}
                    </TableCell>
                    <TableCell sx={{ boxShadow: 1 }}>
                      {/* Aquí deberías reemplazar con el nombre del líder */}
                      Líder de equipo (por implementar)
                    </TableCell>
                    <TableCell sx={{ boxShadow: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <EventIcon fontSize="small" />
                        <Typography variant="body2">{solicitud.submittedDate}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ boxShadow: 1 }}>
                      <Chip
                        label={solicitud.status}
                        color={solicitud.status === "Aceptada" ? "success" : "error"}
                        variant="outlined"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No se encontraron solicitudes que coincidan con la búsqueda.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
