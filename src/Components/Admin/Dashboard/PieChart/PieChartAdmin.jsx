import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminDashboardTotal } from '../../../../redux/Actions/AdminDashboardTotal';
import { toast } from "react-toastify";
import { Box, CircularProgress } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend, Title as ChartTitle } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, ChartTooltip, ChartLegend, ChartTitle);

export default function PieChartAdmin() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.admin_dashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboardTotal());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: data?.data?.map(item => item.label) || [],
    datasets: [
      {
        data: data?.data?.map(item => item.value) || [],
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'],
        hoverBackgroundColor: ['#0077E1', '#00B38A', '#EAA600', '#E8671C', '#E34C20'],
      },
    ],
  };

  return (
    <>
      {data && data?.data?.length > 0 ? (
        <Pie 
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'التوزيع الكلي للبيانات', // Title for the chart
                font: {
                  size: 18,
                },
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                backgroundColor: '#fff',
                borderColor: '#ccc',
                borderWidth: 1,
                titleColor: '#000',
                bodyColor: '#000',
                cornerRadius: 5,
                padding: 10,
              },
            },
          }}
          style={{ width: '350px', height: '350px', margin: '0 auto' }}
        />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
