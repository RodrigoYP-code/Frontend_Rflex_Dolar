import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDollarValues, updateDollar, deleteDollar } from '../store/dollarSlice';
import LoadingScreen from './LoadingScreen';

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
  
 

  if (loading) {return  <LoadingScreen />};

  return  (
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

    <Box   display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" 
             gap={2} mb={3} p={2} sx={{
              bgcolor: '#ffffff',
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 700,
              mx: 'auto'
              }}>
        <Typography variant="h6" sx={{ minWidth: '100%',fontWeight: 'bold',
        color: 'primary.main',mb: 2, }} gutterBottom>
        Filtrar por Fecha
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
      <Box   display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" 
             gap={2} mb={3} p={2} sx={{
              width: '100%',
              maxWidth: 700,
              mx: 'auto',
              mt: 4,
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#ffffff',
              overflowX: 'auto'
              }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 440, overflowX: 'auto' }}>
                <Table  sx={{ minWidth: 650 }} size="small" aria-label="a dense table, sticky table" stickyHeader >
                  <TableHead stickyHeader> 
                    <TableRow>
                      <TableCell   sx={{ fontWeight: 'bold', bgcolor: '#f0f0f0', 
                      color: '#333',  borderBottom: '1px solid #ddd',
                      }}><strong>Fecha</strong></TableCell>
                      <TableCell sx={{fontWeight: 'bold', bgcolor: '#f0f0f0',  
                      color: '#333',borderBottom: '1px solid #ddd',}}><strong>Valor</strong></TableCell>
                      <TableCell sx={{fontWeight: 'bold', bgcolor: '#f0f0f0', 
                      color: '#333', borderBottom: '1px solid #ddd',}}><strong>Acciones</strong></TableCell>
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
                              sx={{ bgcolor: '#64b5f6', '&:hover': { bgcolor: '#42a5f5' } }}
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
                            sx={{ ml: 5 , bgcolor: '#ef5350', '&:hover': { bgcolor: '#e53935' }}} 
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