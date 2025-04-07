import { useEffect, useState } from "react";
import { getReporteHorasIndividual } from "./services/serviceHorario";
import { postHorarioAuxiliar } from "./services/serviceAgregarHorario";
import { deleteSchedule } from "./services/deletehorario"; // Importa el servicio de eliminación
import { updateHorario } from "./services/updateHorario"; // Importa el servicio de actualización
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Modal,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono de eliminar
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Estilo para el modal
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxWidth: "500px",
  width: "100%",
};

const HorariosAuxiliar = () => {
  const [horariosData, setHorariosData] = useState<any>({ horarios: [] }); // Inicialización con array vacío
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal
  const [open, setOpen] = useState<boolean>(false);
  const [diaSemana, setDiaSemana] = useState<string>("");
  const [horaEntrada, setHoraEntrada] = useState<string>("");
  const [horaSalida, setHoraSalida] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  const navigate = useNavigate(); // Navegación para redirigir al usuario

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const data = await getReporteHorasIndividual();
        console.log("Datos obtenidos de la API:", data); // Log para inspeccionar los datos
        if (data.status === 200 && Array.isArray(data.horarios)) {
          setHorariosData(data); // Solo asignamos si hay la propiedad "horarios"
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.mensaje || "Error al obtener los horarios",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener los horarios. Por favor, intenta nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpen(false);
  };

  // Función para agregar un nuevo horario
  const handleAddHorario = async () => {
    setAdding(true);
    try {
      const response = await postHorarioAuxiliar({
        dia_semana: diaSemana,
        hora_entrada: horaEntrada,
        hora_salida: horaSalida,
      });

      if (response.status == 200) {
        handleCloseModal(); // Cerrar el modal después de agregar el horario
        Swal.fire({
          icon: "success",
          title: "Horario agregado",
          text: response.mensaje,
          timer: 2000,
          didClose: () => {
            navigate(0); // Recargar la página después de agregar el horario
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.mensaje || "Error al agregar horario",
        });
      }
    } catch (err) {
      console.error("Error al agregar horario:", err); // Log del error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el horario. Por favor, intenta nuevamente.",
      });
    } finally {
      setAdding(false);
    }
  };

  // Función para eliminar horario
  const handleDeleteHorario = async (id: number) => {
    try {
      const response = await deleteSchedule(id);
      if (response.status === 200) {
        setHorariosData((prevData: any) => ({
          ...prevData,
          horarios: prevData.horarios.filter(
            (horario: any) => horario.Id_horario !== id
          ),
        }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.mensaje || "Error al eliminar el horario",
        });
      }
    } catch (err) {
      console.error("Error al eliminar horario:", err); // Log del error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el horario. Por favor, intenta nuevamente.",
      });
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Agregar Horario
      </Button>

      {/* Modal para agregar horario */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Agregar Nuevo Horario
          </Typography>

          {/* Selección del día de la semana */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Día de la Semana</InputLabel>
            <Select
              value={diaSemana}
              onChange={(e) => setDiaSemana(e.target.value)}
              label="Día de la Semana"
            >
              <MenuItem value="Lunes">Lunes</MenuItem>
              <MenuItem value="Martes">Martes</MenuItem>
              <MenuItem value="Miércoles">Miércoles</MenuItem>
              <MenuItem value="Jueves">Jueves</MenuItem>
              <MenuItem value="Viernes">Viernes</MenuItem>
              <MenuItem value="Sábado">Sábado</MenuItem>
              <MenuItem value="Domingo">Domingo</MenuItem>
            </Select>
          </FormControl>

          {/* Campo de Hora de Entrada */}
          <TextField
            label="Hora de Entrada (24 horas)"
            value={horaEntrada}
            onChange={(e) => setHoraEntrada(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{
              pattern: "([01]?[0-9]|2[0-3]):([0-5][0-9])", // Validación de formato 24 horas
            }}
            helperText="Formato 24 horas (Ej: 08:00, 17:30)"
          />

          {/* Campo de Hora de Salida */}
          <TextField
            label="Hora de Salida (24 horas)"
            value={horaSalida}
            onChange={(e) => setHoraSalida(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{
              pattern: "([01]?[0-9]|2[0-3]):([0-5][0-9])", // Validación de formato 24 horas
            }}
            helperText="Formato 24 horas (Ej: 08:00, 17:30)"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddHorario}
            disabled={adding}
            sx={{ marginTop: 2 }}
          >
            {adding ? <CircularProgress size={24} /> : "Agregar"}
          </Button>
        </Box>
      </Modal>

      {/* Tabla de horarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dia de la Semana</TableCell>
              <TableCell>Hora de Entrada</TableCell>
              <TableCell>Hora de Salida</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(horariosData.horarios) &&
            horariosData.horarios.length > 0 ? (
              horariosData.horarios.map((horario: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{horario.Dia_semana}</TableCell>
                  <TableCell>{horario.Hora_entrada}</TableCell>
                  <TableCell>{horario.Hora_salida}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteHorario(horario.Id_horario)}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No se encontraron horarios</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HorariosAuxiliar;
