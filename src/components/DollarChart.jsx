import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';


const DollarChart = () => {
  const { data, loading } = useSelector((state) => state.dollar);
  const chartData = useMemo(() => {
    return data.map((item) => [
      new Date(item.fecha).getTime(),
      parseFloat(item.valor),
    ]);
  }, [data]);

  const options = {
    title: {
      text: 'USD DOLLAR VALUES',
    },
    rangeSelector: {
      selected: 1,
    },
    exporting: {
      enabled: true,
    },
    series: [
      {
        name: 'USD',
        data: chartData,
        tooltip: {
          valueDecimals: 2,
        },
        type: 'line',
        lastPrice: {
          enabled: true,
          color: 'transparent',
          label: {
            enabled: true,
            backgroundColor: '#ffffff',
            borderColor: '#2caffe',
            borderWidth: 1,
            style: {
              color: '#000000',
            },
          },
        },
      },
    ],
  };
  if (loading) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: '#f9f9f9',
        flex: 1,
        minWidth: 300,
        maxWidth: 700,
      }}
    >
      <Typography
       variant="h4"
       align="center"
        sx={{
          fontWeight: 'bold',
          color: '#2196f3',
          mb: 4,
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          letterSpacing: 1,
        }}
      >
        Fluctuación del Dólar
      </Typography>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    </Paper>
  );
};

export default DollarChart;
