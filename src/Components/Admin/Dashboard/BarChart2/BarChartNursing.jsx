import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';
import { fetchAdminDashboardTotalNursing } from '../../../../redux/Actions/AdminDashboardTotalNursing';
import { toast } from 'react-toastify';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

export default function BarChartNursingAdmin() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.admin_nursing);
  
  useEffect(() => {
    dispatch(fetchAdminDashboardTotalNursing());
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

  console.log("data", data);

  // Prepare data for Chart.js
  const chartData = {
    labels: ['ذكر', 'أنثى'], // Male and Female in Arabic
    datasets: [
      {
        label: 'عدد الممرضين', // Number of Nursing Persons in Arabic
        data: [data.male || 0, data.female || 0],
        backgroundColor: ['#0088FE', '#00C49F'],
        borderColor: ['#0056b3', '#008c8c'],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  // Options for the Bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
      title: {
        display: true,
        text: 'عدد الممرضين حسب الجنس', // Number of Nursing Persons by Gender in Arabic
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'الجنس', // Gender in Arabic
        },
      },
      y: {
        title: {
          display: true,
          text: 'عدد الممرضين', // Number of Nursing Persons in Arabic
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Box sx={{ height: "100%", width: '100%' }}>
        {data ? (
          <Bar 
            data={chartData}
            options={options}
          />
        ) : (
          <p>لا توجد بيانات متاحة</p> // No data available in Arabic
        )}
      </Box>
    </>
  );
}
