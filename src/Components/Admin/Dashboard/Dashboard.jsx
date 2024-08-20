import React from 'react';
// import PieChartAdmin from './PieChart/PieChartAdmin';
// import BarChartAdmin from './BarChart/BarChartAdmin';
import { Box, Grid } from '@mui/material';
import PieChartAdmin from './PieChart/PieChartAdmin';
import BarChartAdmin from './BarChart/BarChartAdmin';
import BarChartNusingAdmin from './BarChart2/BarChartNursing';
import BarChartMedicalAdmin from './BarChart3/BarChartMedical';

export default function Dashboard() {

    return (
        <div style={{ textAlign: 'center', }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '15px' }}>لوحة التحكم </h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        marginBottom: 2,
                        overflow: 'hidden'
                    }}>
                        <PieChartAdmin />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        marginBottom: 2,
                        overflow: 'hidden'
                    }}>
                        <BarChartAdmin />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        marginBottom: 2,
                        overflow: 'hidden'
                    }}>
                        <BarChartNusingAdmin />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        marginBottom: 2,
                        overflow: 'hidden'
                    }}>
                        <BarChartMedicalAdmin />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
