import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { fetchAdminDashboardTotalDoc } from '../../../../redux/Actions/AdminDashboardTotalDoc';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

export default function BarChartAdmin() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.admin_dashboard_doc);
  useEffect(() => {
    dispatch(fetchAdminDashboardTotalDoc());
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
    labels: data && data?.map(item => item.specialty_name) || [],
    datasets: [
      {
        label: 'عدد الأطباء',
        data: data && data?.map(item => item['دكتور']) || [],
        backgroundColor: '#8884d8',
        borderColor: '#6d60c4',
        borderWidth: 1,
        barThickness: 20,
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
        text: 'توزيع عدد الأطباء حسب التخصص',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'التخصصات',
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'عدد الأطباء',
        },
      },
    },
  };

  return (
    <>
    
      <Box sx={{ height: "100%", width: '100%' }}>
        {data && data.length > 0 ? (
          <Bar 
            data={chartData}
            options={options}
          />
        ) : (
          <p>No data available</p>
        )}
      </Box>
    </>
  );
}
