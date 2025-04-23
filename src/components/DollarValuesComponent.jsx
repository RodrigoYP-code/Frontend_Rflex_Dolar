import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDollarValues, updateDollar, deleteDollar } from '../store/dollarSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Typography,
  TextField,
   Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DollarValuesComponent = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dollar);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState(new Date());
  const [editing, setEditing] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 30;
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFecha, setSelectedFecha] = useState(null);
  
  const confirmDelete = (fecha) => {
  setSelectedFecha(fecha);
  setConfirmOpen(true);
  };
  
  useEffect(() => {
    dispatch(
      getDollarValues({
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      })
    );
  }, [dispatch, startDate, endDate]);
  
  const handleUpdate = (fecha) => {
  if (newValue) {
    dispatch(updateDollar({ fecha, newValue })).then(() => {
      dispatch(
        getDollarValues({
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        })
      );
    });
    setEditing(null);
    setNewValue('');
  }
  };
  const handleConfirmDelete = () => {
  dispatch(deleteDollar(selectedFecha));
  setConfirmOpen(false);
  setSelectedFecha(null);
  };
  
 

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás segura de que querés eliminar el valor del <strong>{selectedFecha}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" gap={2} alignItems="center" mb={2} sx={{
            maxWidth: 550,
            mx: 'auto',
            mt: 3,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: '#f9f9f9',
      }}>
        <Typography variant="h6" gutterBottom>
        Filtra la página
      </Typography>
        <DatePicker
          label="Fecha inicio"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Fecha fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          variant="contained"
          onClick={() =>
            dispatch(
              getDollarValues({
                startDate: startDate.toISOString().slice(0, 10),
                endDate: endDate.toISOString().slice(0, 10),
              })
            )
          }
        >
          Buscar
        </Button>
      </Box>
      <Box display="flex" gap={2} alignItems="center" mb={2} sx={{
          maxWidth: 550,
          mx: 'auto',
          mt: 3,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: '#f9f9f9',
          size:"small", 
        }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table  sx={{ minWidth: 650 }} size="small" aria-label="a dense table, sticky table" stickyHeader >
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Fecha</strong></TableCell>
                      <TableCell><strong>Valor</strong></TableCell>
                      <TableCell><strong>Acciones</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((item) => (
                      <TableRow key={item.fecha}>
                        <TableCell>{item.fecha}</TableCell>
                        <TableCell>
                          {editing === item.fecha ? (
                            <TextField
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                              label="Nuevo valor"
                              type="number"
                            />
                          ) : (
                            `$${item.valor}`
                          )}
                        </TableCell>
                        <TableCell>
                          {editing === item.fecha ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdate(item.fecha)}
                            >
                              Guardar
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="#f9f9f9"
                              onClick={() => {
                                setEditing(item.fecha);
                                setNewValue(item.valor);
                              }}
                            >
                              Editar
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ ml: 5 }} 
                            onClick={() => confirmDelete(item.fecha)}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  
                  </Table>
                  <TablePagination
                      component="div"
                      count={data.length}
                      page={page}
                      onPageChange={(event, newPage) => setPage(newPage)}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[30]}
                      labelRowsPerPage=""
                    />
                  </TableContainer>
                  
              )}
        </Box>
    </div>
  );
};

export default DollarValuesComponent;
