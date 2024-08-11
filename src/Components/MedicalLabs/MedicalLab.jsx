import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, CardActionArea,
  TextField, Button, Grid, Container, Box, Rating,
  Accordion, AccordionSummary, AccordionDetails,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaRegFrownOpen } from 'react-icons/fa';
import { calculateAverageRating } from '../../Common/Helper/helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchMedicalLabs } from '../../redux/Actions/medicalLabsActions';
import { toast } from "react-toastify";

const MedicalLabs = () => {
  const [nameFilter, setNameFilter] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { medicalLabsData } = useSelector((state) => state.medical_lab);
  const status = useSelector((state) => state.medical_lab.status);
  const error = useSelector((state) => state.medical_lab.error);

  useEffect(() => {
    dispatch(fetchMedicalLabs()); // Fetch new data
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  // Ensure `medicalLabsData` is an array
  const filteredLabs = Array.isArray(medicalLabsData) 
    ? medicalLabsData.filter(lab => lab.name.toLowerCase().includes(nameFilter.toLowerCase())) 
    : [];

  const handleRating = (ratings) => {
    return ratings?.length ? calculateAverageRating(ratings) : 0;
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Adjust as needed to center vertically
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <h1>المختبرات الطبية</h1>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="بحث بالاسم"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
        />
      </Box>
      <Grid container spacing={3}>
        {filteredLabs.length > 0 ? (
          filteredLabs.map((lab) => (
            <Grid item xs={12} sm={6} md={4} key={lab._id}>
              <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/medical_profile/${lab._id}`)} >
                <CardActionArea>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {lab.name}
                      </Typography>
                      <Rating value={handleRating(lab.ratings)} readOnly precision={0.5} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {lab.medical_desc}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOnIcon color="action" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {lab.location}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/medical_profile/${lab._id}`)}
                  >
                    تفاصيل أكثر
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box textAlign="center" sx={{ width: '100%' }}>
            <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
            <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
              لا يوجد معامل
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default MedicalLabs;
