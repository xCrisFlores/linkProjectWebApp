import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";


// Estilos de las columnas
const columnStyles = {
  ToDo: { backgroundColor: "#f5f5f5" },
  InProgress: { backgroundColor: "#fff7e6" },
  Completed: { backgroundColor: "#e6ffed" },
};

// Datos iniciales
const initialData = {
  columns: {
    todo: {
      name: "To-do",
      items: [
        { id: "1", category: "Category", description: "Description Top" },
        { id: "2", category: "Category", description: "Description Top" },
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [
        { id: "3", category: "Category", description: "Description Top" },
      ],
    },
    completed: {
      name: "Completed",
      items: [
        { id: "4", category: "Category", description: "Description Top" },
      ],
    },
  },
};

export default function Tasks(){
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("Tareas"); // Para mantener la pestaña activa

  // Manejar el evento de arrastrar y soltar
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Si no se suelta en una columna válida, no hacer nada

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: { ...sourceColumn, items: sourceItems },
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: { ...sourceColumn, items: sourceItems },
          [destination.droppableId]: { ...destColumn, items: destItems },
        },
      });
    }
  };

  // Función para manejar la navegación entre tabs
  const handleNavigate = (tab) => {
    setActiveTab(tab);
    if (tab === "General") {
      navigate("/mi-proyecto");
    } else if (tab === "Tareas") {
      navigate("/tareas");
    }
    // Agregar las rutas para otras pestañas según sea necesario
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
      {/* Título de la página */}
      <Typography variant="h4" gutterBottom>
        Panel del proyecto
      </Typography>

      {/* Barra de navegación */}
      <Box sx={{ display: "flex", gap: 3, marginBottom: 4 }}>
        {["General", "Tareas", "Reuniones", "Team"].map((tab, index) => (
          <Button
            key={index}
            onClick={() => handleNavigate(tab)}
            sx={{
              textTransform: "none",
              color: activeTab === tab ? "black" : "gray",
              fontWeight: activeTab === tab ? "bold" : "normal",
              position: "relative",
              padding: "6px 16px",
              "&:hover": {
                color: "black",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "2px",
                backgroundColor: "black",
                bottom: 0,
                left: 0,
                transform: "scaleX(0)",
                transformOrigin: "bottom right",
                transition: "transform 0.3s ease",
              },
              "&:hover::after": {
                transform: "scaleX(1)",
                transformOrigin: "bottom left",
              },
              "&.Mui-selected": {
                backgroundColor: "#f0f0f0",
              },
            }}
            selected={activeTab === tab}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* Tareas */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box display="flex" gap={2} padding={2}>
          {Object.entries(data.columns).map(([columnId, column]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  flex={1}
                  minWidth={250}
                  padding={2}
                  borderRadius={2}
                  style={{ ...columnStyles[columnId] }}
                  boxShadow="0 2px 8px rgba(0,0,0,0.4)"
                >
                  <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                    {column.name}
                  </Typography>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginBottom: "16px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)", // Sombra más fuerte
                          }}
                        >
                          <CardContent>
                            <Typography variant="body2" fontWeight="bold">
                              {item.category}
                            </Typography>
                            <Typography variant="body2">
                              {item.description}
                            </Typography>
                            <Box display="flex" gap={1} marginTop={1}>
                              <Button size="small">+</Button>
                              <Button size="small">📅</Button>
                              <Button size="small">✏️</Button>
                              <Button size="small">🚩</Button>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Button fullWidth size="small" style={{ marginTop: 8 }}>
                    + New Task
                  </Button>
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

