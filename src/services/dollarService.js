import http from '../core/http';

export const fetchDollarValues = (startDate, endDate) => {
  return http.get('/rango', {
      params: { inicio: startDate, fin: endDate },
  });
};
export const updateDollarValue = (fecha, newValue) => {
  return http.put('/dolar/actualizar', { fecha, valor: newValue });
};

export const deleteDollarValue = (fecha) => {
  return http.delete('/dolar/eliminar', { data: { fecha } });
};