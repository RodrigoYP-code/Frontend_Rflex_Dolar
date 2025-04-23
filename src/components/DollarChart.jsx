import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';


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
      text: 'Fluctuación del Dólar',
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
  if (loading) return ;
  return (
      <div>
        <Typography variant="h3" gutterBottom  align="start"   sx={{ mt: 6 }} >
            Valores del dólar 
        </Typography>
               {loading ? (
                             <CircularProgress />
                           ) : ( <Box
                display="flex"
                gap={2}
                alignItems="center"
                mb={2}
                sx={{
                    maxWidth: 700,
                    height: 435,
                    mt: 6,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: '#f9f9f9',
                }}
                    >
                        
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType="stockChart"
                    options={options}
                />
          </Box>
                  )}
    </div>
  );
};

export default DollarChart;
