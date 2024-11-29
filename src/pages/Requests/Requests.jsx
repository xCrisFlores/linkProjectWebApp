import React, { useState } from "react";
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
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";

const solicitudesData = [
  { proyecto: "Universe", lider: "Alberto del Arco Rivas", fecha: "11/10/2024", estado: "Aceptada" },
  { proyecto: "Olvia", lider: "Asusena Perez Jimenez", fecha: "07/10/2024", estado: "Rechazada" },
  { proyecto: "Tiendita", lider: "Jose Juan Gutierrez Garcia", fecha: "16/10/2024", estado: "Aceptada" },
  { proyecto: "Blood match", lider: "Alejandro Cristian Rosales Flores xd", fecha: "23/11/2024", estado: "Rechazada" },
];

export function Requests() {
  const [search, setSearch] = useState("");

  // Filtrar las solicitudes por el nombre del proyecto
  const filteredSolicitudes = solicitudesData.filter((solicitud) =>
    solicitud.proyecto.toLowerCase().includes(search.toLowerCase())
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

      {/* Tabla de solicitudes */}
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
                  <TableCell sx={{ boxShadow: 1 }}>{solicitud.proyecto}</TableCell>
                  <TableCell sx={{ boxShadow: 1 }}>{solicitud.lider}</TableCell>
                  <TableCell sx={{ boxShadow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <EventIcon fontSize="small" />
                      <Typography variant="body2">{solicitud.fecha}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ boxShadow: 1 }}>
                    <Chip
                      label={solicitud.estado}
                      color={solicitud.estado === "Aceptada" ? "success" : "error"}
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
    </Box>
  );
}
